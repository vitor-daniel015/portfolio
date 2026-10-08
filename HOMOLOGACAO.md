# Homologação

O site usa arquivos locais. Não consulta Supabase e não possui painel administrativo. A edição e os cuidados com mídia estão documentados em `README.md`.

## Banco anterior

`supabase/rollback/desativar_painel.sql` pode ser usado no SQL Editor do Supabase para revogar permissões do painel e remover suas políticas, preservando dados, usuários e mídias. Não restaura integralmente o estado anterior: tabelas e funções permanecem guardadas. O bucket mantém as URLs públicas existentes.

A aplicação funciona sem executar esse SQL e sem variáveis Supabase. Componentes antigos e suas dependências foram removidos. Não rode novas migrações para editar o portfólio.

## Verificação em 08/10/2026

- Compilação de produção, TypeScript estrito e formatação.
- Referências locais de mídia e índice progressivo dos MP4.
- Chrome: página inicial, trabalhos, links, filtros e busca.
- Reprodução dos 14 vídeos; nenhuma requisição MP4 antes de abrir um player.
- Artes completas no lightbox, fechamento por Escape e restauração da rolagem.
- 17 páginas do manual Oportuniza.
- Layout de 390 px sem ultrapassar a largura da tela.
- Auditoria das dependências sem vulnerabilidades conhecidas na execução realizada.

Verificações locais. Nenhuma publicação foi feita. Cabeçalhos e cache da hospedagem devem ser conferidos após publicar.
