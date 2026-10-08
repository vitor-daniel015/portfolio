import { initialContent } from "./content";

// O portfólio é mantido exclusivamente pelos arquivos locais.
// Edite content.ts para apresentação, cases, trabalhos, contatos e trajetória.
// Edite projects.ts para os projetos de desenvolvimento.
const publishedContent = {
  content: initialContent
    .filter((item) => item.status === "published")
    .sort((a, b) => a.sort_order - b.sort_order),
};

export function useContent() {
  return publishedContent;
}
