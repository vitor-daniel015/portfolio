# Portfólio em homologação — edição por arquivos

O site usa exclusivamente os arquivos do projeto. Não consulta Supabase, não depende de migrações e não possui painel administrativo. A rota /admin redireciona para a página inicial.

## Onde editar
- `src/data/content.ts`: apresentação, foto, contatos, cases, métricas, artes, vídeos e trajetória.
- `src/data/projects.ts`: títulos, imagens, descrições e links dos nove projetos de desenvolvimento.
- `public/`: imagens e vídeos locais; use caminhos como `/minha-arte.webp` no conteúdo.
- `src/components/Portfolio.tsx`: estrutura da página.
- `src/index.css`: cores, tipografia e layout.

Para uma arte ou vídeo, acrescente um item à lista initialContent seguindo o tipo ContentItem. Use kind `art` ou `video`, image para miniatura e video_url para vídeo. Cada item tem título, descrição, objetivo, autoria, créditos e ferramentas. Publicados aparecem no site; rascunhos e arquivados são filtrados da interface. Todos os dados escritos no código podem ser lidos no pacote público: não armazene informações sigilosas, mesmo em rascunhos.

Métricas aparecem quando confirmed é true e período e fonte estão preenchidos. Não inclua resultados sem contexto ou autoria não confirmada.

## Desativar o painel no banco
Execute `supabase/rollback/desativar_painel.sql` no SQL Editor do Supabase. O script revoga as permissões do painel e remove suas políticas, preservando os dados, usuários e mídias. Não é uma restauração integral do estado anterior: as tabelas e funções ficam guardadas e sem acesso pelo aplicativo. O bucket permanece com as URLs públicas existentes.

A alteração do código já recupera o conteúdo sem executar o SQL. As variáveis Supabase não são mais necessárias para o site. Os componentes antigos de administração e audiovisual com banco não são usados pelas rotas atuais.

## Executar
`npm run dev` para homologação local; `npm run lint` e `npm run build` para verificar. Não houve publicação em produção.

## Galeria e página de bio
A página de links está em `/links`, com alternativa `/bio`. O portfólio completo continua em `/` e `/portfolio`.
Edite `src/data/media.ts` para incluir, retirar ou ordenar artes e vídeos. Os arquivos originais estão em `public/portfolio/`; as miniaturas estão em `public/portfolio/previews/`. A reprodução de vídeo é iniciada pelo visitante, e fechar os detalhes interrompe a reprodução.
Os cases usam os campos sections e gallery em `src/data/content.ts`. A identidade visual do Oportuniza foi creditada a Vitor Daniel conforme sua confirmação. Os projetos NeoTech, JG Modas e Cenário Tech são identificados como acadêmicos.

## Destaques e arquivo completo
A seleção da página inicial é definida em `src/data/featured.ts`. Edite os nomes na lista featuredWorkTitles para escolher e ordenar os destaques. A página `/trabalhos` mostra todos os projetos, cases, artes e vídeos publicados, com filtros e busca. Os sites abrem diretamente seus links; o Oportuniza mantém os detalhes do projeto.
