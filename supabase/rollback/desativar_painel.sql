-- Desativação segura do painel introduzido em 202610080002_portfolio_cms.sql.
-- Execute no SQL Editor do mesmo projeto Supabase.
-- Não apaga tabelas, registros, usuários nem arquivos de mídia.
-- O portfólio atualizado usa somente arquivos locais, independentemente deste SQL.
begin;

do $$ begin
  if to_regclass('public.portfolio_content') is not null then
    revoke all on public.portfolio_content from anon, authenticated;
    drop policy if exists portfolio_public_read on public.portfolio_content;
    drop policy if exists portfolio_admin_access on public.portfolio_content;
    drop trigger if exists portfolio_content_validation on public.portfolio_content;
    alter table public.portfolio_content enable row level security;
  end if;
  if to_regclass('public.portfolio_admins') is not null then
    revoke all on public.portfolio_admins from anon, authenticated;
    alter table public.portfolio_admins enable row level security;
  end if;
  if to_regprocedure('public.is_portfolio_admin()') is not null then
    revoke all on function public.is_portfolio_admin() from public, anon, authenticated;
  end if;
end $$;

drop policy if exists portfolio_media_admin_select on storage.objects;
drop policy if exists portfolio_media_admin_insert on storage.objects;
drop policy if exists portfolio_media_admin_update on storage.objects;
drop policy if exists portfolio_media_admin_delete on storage.objects;

-- O bucket e seus arquivos são preservados, inclusive URLs públicas existentes.
-- Não reabre escrita pública na tabela videos: o estado anterior das permissões
-- não foi registrado e o site atualizado não usa essa tabela.
notify pgrst, 'reload schema';
commit;
