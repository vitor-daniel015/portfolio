-- Execute no SQL Editor do projeto Supabase configurado no aplicativo.
begin;

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text not null,
  thumbnail text,
  category text not null default 'filmmaker'
    check (category in ('filmmaker', 'livestream', 'editing')),
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;
grant select on public.videos to anon, authenticated;
drop policy if exists "Public video catalog" on public.videos;
create policy "Public video catalog" on public.videos
  for select to anon, authenticated using (true);

-- Escritas devem usar uma identidade administrativa autenticada ou o Dashboard.
-- A senha local do frontend não autentica usuários no Supabase.

notify pgrst, 'reload schema';
commit;
