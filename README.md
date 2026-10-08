# Portfólio — Vitor Daniel

Site estático em React, TypeScript e Vite. Conteúdo editado nos arquivos, sem banco de dados ou painel administrativo.

## Executar e verificar

```sh
npm ci
npm run dev
npm run lint
npm run check:assets
npm run format:check
npm run build
npm run preview
```

A compilação verifica tipos e referências de mídia antes de gerar `dist/`. Publique somente essa pasta. `_redirects` e `_headers` configuram rotas e cabeçalhos no Netlify. Outros serviços precisam de configuração equivalente para as rotas.

## Editar

- `src/data/content.ts`: apresentação, contatos, cases, métricas e trajetória.
- `src/data/projects.ts`: sites e projetos de desenvolvimento.
- `src/data/media.ts`: artes, vídeos, miniaturas e ordem da galeria.
- `src/data/featured.ts`: seleção e ordem dos destaques.
- `src/index.css`: aparência e comportamento responsivo.

Rotas: `/` e `/portfolio`; `/trabalhos` para artes e vídeos; `/links` e `/bio` para a página de links. As rotas antigas redirecionam ao portfólio.

Dados no código são públicos, inclusive rascunhos. Não coloque informações sigilosas. Métricas precisam de período, fonte e confirmação do contexto.

## Mídia

Vídeos publicados ficam em `public/portfolio/videos/`; miniaturas e páginas da identidade visual em `public/portfolio/previews/`. As artes maiores usam WebP. Originais preservados ficam em `media-originals/`, ignorados pelo Git e fora da publicação. Guarde uma cópia de segurança dessa pasta separadamente.

Exporte H.264 com áudio AAC, proporção original e resolução adequada, sem ampliar vídeos de baixa resolução. Para vídeos verticais, até 1080 × 1920 e 30 fps. Exemplo com FFmpeg instalado:

```sh
ffmpeg -i original.mp4 -c:v libx264 -crf 23 -preset fast -pix_fmt yuv420p -fpsmax 30 -c:a aac -b:a 128k -movflags +faststart otimizado.mp4
```

Confira imagem, áudio e duração antes de substituir. Se a conversão aumentar o tamanho, mantenha a compressão original e prepare somente o índice com `-c copy -movflags +faststart`.

As páginas carregam separadamente. Imagens fora do início usam carregamento sob demanda. Vídeos só entram na página ao abrir o player; fechar interrompe a reprodução e libera o arquivo. Use imagens como miniaturas.

## Manutenção

Use `npm run format` antes de entregar alterações. TypeScript usa regras estritas e rejeita variáveis e importações sem uso. A compilação verifica as referências locais e o índice progressivo dos MP4. Rode `npm audit` após atualizar dependências; o arquivo de lock mantém as versões verificadas.

Os SQL em `supabase/` foram preservados como histórico e para desativação do painel anterior. Não são usados pelo site. Consulte `HOMOLOGACAO.md` antes de alterar o banco.
