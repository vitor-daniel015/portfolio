begin;
create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.portfolio_admins enable row level security;
revoke all on public.portfolio_admins from anon, authenticated;
create or replace function public.is_portfolio_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.portfolio_admins where user_id = auth.uid());
$$;
revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;
create table if not exists public.portfolio_content (
  id text primary key,
  kind text not null check (kind in ('profile','case','project','art','video','experience')),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order integer not null default 0,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  updated_at timestamptz not null default now()
);
create index if not exists portfolio_content_order on public.portfolio_content(status, sort_order);
alter table public.portfolio_content enable row level security;
grant select on public.portfolio_content to anon;
grant select, insert, update, delete on public.portfolio_content to authenticated;
drop policy if exists portfolio_public_read on public.portfolio_content;
create policy portfolio_public_read on public.portfolio_content for select to anon, authenticated using (status = 'published');
drop policy if exists portfolio_admin_access on public.portfolio_content;
create policy portfolio_admin_access on public.portfolio_content for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create unique index if not exists portfolio_single_profile on public.portfolio_content(kind) where kind = 'profile' and status = 'published';
create or replace function public.validate_portfolio_content() returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  if new.status = 'published' then
    if coalesce(trim(new.payload->>'title'), '') = '' then raise exception 'Título obrigatório'; end if;
    if new.kind in ('art','video') and coalesce(new.payload->>'image','') = '' and coalesce(new.payload->>'video_url','') = '' then raise exception 'Mídia obrigatória'; end if;
    if exists(select 1 from jsonb_array_elements(coalesce(new.payload->'metrics', '[]'::jsonb)) m where coalesce((m->>'confirmed')::boolean,false) = false or coalesce(trim(m->>'period'),'') = '' or coalesce(trim(m->>'source'),'') = '') then raise exception 'Métricas sem confirmação'; end if;
  end if;
  return new;
end;
$$;
drop trigger if exists portfolio_content_validation on public.portfolio_content;
create trigger portfolio_content_validation before insert or update on public.portfolio_content for each row execute function public.validate_portfolio_content();
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('portfolio-media','portfolio-media',true,52428800,array['image/jpeg','image/png','image/webp','video/mp4','video/webm'])
on conflict(id) do nothing;
drop policy if exists portfolio_media_admin_select on storage.objects;
create policy portfolio_media_admin_select on storage.objects for select to authenticated using(bucket_id = 'portfolio-media' and public.is_portfolio_admin());
drop policy if exists portfolio_media_admin_insert on storage.objects;
create policy portfolio_media_admin_insert on storage.objects for insert to authenticated with check(bucket_id = 'portfolio-media' and public.is_portfolio_admin());
drop policy if exists portfolio_media_admin_update on storage.objects;
create policy portfolio_media_admin_update on storage.objects for update to authenticated using(bucket_id = 'portfolio-media' and public.is_portfolio_admin()) with check(bucket_id = 'portfolio-media' and public.is_portfolio_admin());
drop policy if exists portfolio_media_admin_delete on storage.objects;
create policy portfolio_media_admin_delete on storage.objects for delete to authenticated using(bucket_id = 'portfolio-media' and public.is_portfolio_admin());
-- Preserve vídeos existentes, mas elimine escrita pública caso haja políticas antigas.
do $$ begin
  if to_regclass('public.videos') is not null then
    alter table public.videos enable row level security;
    revoke insert, update, delete on public.videos from anon, authenticated;
  end if;
end $$;
notify pgrst, 'reload schema';
commit;
