import { legacyProjects } from "./projects";
import { portfolioMedia } from "./media";
export type ContentKind =
  "case" | "project" | "art" | "video" | "experience" | "profile";
export interface Metric {
  platform: string;
  value: string;
  unit: string;
  period: string;
  source: string;
  context: string;
  confirmed: boolean;
}
export interface ContentItem {
  id: string;
  kind: ContentKind;
  title: string;
  description: string;
  status: "draft" | "published" | "archived";
  sort_order: number;
  image: string;
  url: string;
  video_url: string;
  client: string;
  format: string;
  date: string;
  role: string;
  credits: string;
  objective: string;
  tools: string;
  links: { label: string; url: string }[];
  metrics: Metric[];
  gallery?: { src: string; caption: string }[];
  sections?: { title: string; text: string }[];
}
const emptyItem = (kind: ContentKind = "project"): ContentItem => ({
  id: "",
  kind,
  title: "",
  description: "",
  status: "draft",
  sort_order: 0,
  image: "",
  url: "",
  video_url: "",
  client: "",
  format: "",
  date: "",
  role: "",
  credits: "",
  objective: "",
  tools: "",
  links: [],
  metrics: [],
});
const item = (
  id: string,
  kind: ContentKind,
  title: string,
  extra: Partial<ContentItem>,
): ContentItem => ({
  ...emptyItem(kind),
  id,
  title,
  status: "published",
  ...extra,
});
export const initialContent: ContentItem[] = [
  item("profile-vitor", "profile", "Vitor Daniel", {
    description:
      "Conecto desenvolvimento, conteúdo e audiovisual para construir a presença digital de marcas e negócios.",
    role: "Desenvolvimento, Social Media e Audiovisual.",
    image: "/profile.jpg",
    objective: "Disponível para oportunidades e projetos",
    tools:
      "Canva, CapCut, Meta Business Suite, React, TypeScript, JavaScript, Node.js, Tailwind CSS, GitHub",
    credits: "Inglês A1 · TOEIC Bridge",
    links: [
      { label: "E-mail", url: "mailto:vi.daniel16@gmail.com" },
      { label: "WhatsApp", url: "https://wa.me/5515998571316" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vitor-daniel-b7133b2ab/",
      },
      { label: "GitHub", url: "https://github.com/vitor-daniel015" },
    ],
  }),
  item("case-braba", "case", "Rádio Braba", {
    sort_order: 0,
    client: "Comunicação & entretenimento",
    date: "Agosto de 2025 — atual",
    image: "/InstaRadioBraba.png",
    sections: [
      {
        title: "Uma operação de conteúdo contínua",
        text: "Minha atuação conecta o planejamento à execução: criação de peças, stories quase diários, edição e publicação. A rotina acompanha a programação da rádio e os acontecimentos da região.",
      },
      {
        title: "Da rádio para as plataformas",
        text: "Além do Instagram, atuo com o conteúdo do YouTube e com a cobertura de eventos. O trabalho envolve organizar diferentes formatos para manter a comunicação da rádio presente nos canais digitais.",
      },
    ],
    role: "Gerente geral · Gestão do ecossistema digital",
    description:
      "Da rotina de conteúdo à cobertura de eventos: uma presença digital que conecta a rádio ao seu público.",
    objective:
      "Organizar e manter a presença digital da rádio em diferentes canais.",
    tools: "Canva, CapCut, Meta Business Suite",
    metrics: [
      {
        platform: "Instagram",
        value: "1.004.976",
        unit: "visualizações",
        period: "Registro de outubro de 2026; janela exata não informada",
        source: "Apresentação Rádio Braba fornecida por Vitor Daniel",
        context:
          "Resultado da conta, incluindo colaborações. O print indica 1,2% de anúncios; não representa total exclusivamente orgânico nem média mensal.",
        confirmed: true,
      },
      {
        platform: "Instagram",
        value: "90.301",
        unit: "contas alcançadas",
        period: "Registro de outubro de 2026; janela exata não informada",
        source: "Apresentação Rádio Braba fornecida por Vitor Daniel",
        context: "Indicador da conta no recorte documentado.",
        confirmed: true,
      },
      {
        platform: "YouTube",
        value: "14.550",
        unit: "visualizações",
        period:
          "Janela de 30 dias registrada em outubro de 2026; datas exatas não informadas",
        source: "Apresentação Rádio Braba fornecida por Vitor Daniel",
        context:
          "No mesmo recorte: 276,2 horas de exibição e +61 inscritos. Resultado do canal.",
        confirmed: true,
      },
    ],
    format:
      "Planejamento, design, posts, stories, edição, publicação no YouTube e cobertura de eventos.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/radiobraba" },
      { label: "YouTube", url: "https://www.youtube.com/@radiobraba" },
      { label: "TikTok", url: "https://www.tiktok.com/@radiobraba" },
      { label: "Facebook", url: "https://www.facebook.com/radiobrabaoficial" },
      { label: "Site", url: "https://radiobraba.com.br" },
    ],
  }),
  item("case-mauro", "case", "Mauro D’Luka", {
    sort_order: 1,
    image: "/InstaMauroDLuka.png",
    sections: [
      {
        title: "Conteúdo com a identidade do artista",
        text: "Trabalho a comunicação visual e a edição para acompanhar a carreira de Mauro D’Luka. As peças conectam agenda, música e presença nas plataformas, preservando a personalidade do artista.",
      },
      {
        title: "Uma atuação próxima da rotina",
        text: "A frequência de conteúdo acompanha as necessidades do artista. Minha atuação é individual neste projeto e reúne social media, edição de vídeos e presença em Instagram, YouTube e Spotify.",
      },
    ],
    client: "Música & presença artística",
    date: "Abril de 2026 — atual",
    role: "Social Media · Edição de vídeo",
    description:
      "Conteúdo e edição para acompanhar a presença digital do artista, com atuação em Instagram, YouTube e Spotify.",
    objective:
      "Apoiar a presença digital do artista com conteúdo alinhado às suas necessidades.",
    format:
      "Redes sociais e edição de vídeos. Frequência conforme a agenda do artista.",
    metrics: [
      {
        platform: "Instagram",
        value: "9.540",
        unit: "visualizações",
        period: "9 de julho a 6 de outubro de 2026 · 90 dias",
        source:
          "Print de Instagram Insights; perfil confirmado por Vitor Daniel",
        context: "Resultado geral da conta no período.",
        confirmed: true,
      },
      {
        platform: "Instagram",
        value: "+48",
        unit: "seguidores líquidos",
        period: "9 de julho a 6 de outubro de 2026 · 90 dias",
        source:
          "Print de Instagram Insights; perfil confirmado por Vitor Daniel",
        context:
          "Saldo líquido no período; não equivale ao total de seguidores.",
        confirmed: true,
      },
    ],
    links: [
      { label: "Instagram", url: "https://www.instagram.com/maurodlukaa" },
      { label: "YouTube", url: "https://www.youtube.com/@MauroDLukaOficial" },
      { label: "TikTok", url: "https://www.tiktok.com/@maurodlukaoficial" },
      { label: "Facebook", url: "https://www.facebook.com/MauroDLukaOficiall" },
      {
        label: "Spotify",
        url: "https://open.spotify.com/intl-pt/artist/5D8oq9BmcGPILSgWki0ZMA?si=GFKh5lYvSd6CdkhduvKkhQ",
      },
    ],
  }),
  item("case-fivelados", "case", "Fivelados", {
    sort_order: 2,
    client: "Rodeio · Transmissão ao vivo",
    image: "/fivelados.jpg",
    video_url: "/portfolio/videos/FIVELADOS%20VIDEO%20PROPRIO.mp4",
    role: "Coordenação da live · Equipe de filmagem e produção",
    date: "3 dias de transmissão",
    description:
      "Três dias de live para apresentar o rodeio por uma perspectiva diferente, em uma operação conjunta de filmagem e produção.",
    objective:
      "Coordenar uma cobertura ao vivo que ampliasse a experiência do rodeio para o público digital.",
    format:
      "Coordenação de live, cobertura de rodeio e produção audiovisual em equipe.",
    sections: [
      {
        title: "Três dias, uma operação em equipe",
        text: "Coordenei a live ao longo de três dias, trabalhando com @felipebranco, @marcuscirillu e uma equipe de filmagem e produção. A cobertura buscou apresentar o rodeio de uma forma diferente, conectando a experiência do evento à transmissão.",
      },
      {
        title: "Minha participação",
        text: "Minha responsabilidade foi a coordenação da live junto à equipe. O resultado reúne contribuições de filmagem, apresentação e produção; os créditos refletem essa construção coletiva.",
      },
    ],
    links: [
      {
        label: "Canal Fivelados",
        url: "https://www.youtube.com/@RodeioFivelados",
      },
    ],
  }),
  ...legacyProjects.map((p, i) =>
    item("project-" + i, "project", p.title, {
      sort_order: i,
      description: p.desc.replace("instituicional", "institucional"),
      image: p.image || "",
      url: p.link,
      tools: p.tags.join(", "),
      ...(i === 0
        ? {
            role: "Idealização e criação integral da identidade visual · TCC",
            objective:
              "Conectar quem precisa de serviços domésticos a quem oferece esses serviços, organizando oportunidades em uma plataforma digital.",
            description:
              "Um marketplace de serviços domésticos idealizado por mim como TCC. A proposta conecta pessoas, necessidades e oportunidades da concepção do produto à identidade que comunica essa ideia.",
            credits:
              "Ideia e identidade visual por Vitor Daniel. Desenvolvimento do TCC em equipe com Laís Pereira dos Santos, Lauro Domingues da Silva Neto e Larissa Silveira Sudo.",
            gallery: [
              {
                src: "/portfolio/previews/Oportuniza - 1.png",
                caption: "Conceito inicial da proposta do Oportuniza",
              },
              {
                src: "/portfolio/previews/Oportuniza - 2.png",
                caption: "Estrutura visual da marca e do sistema de identidade",
              },
              {
                src: "/portfolio/previews/Oportuniza - 3.png",
                caption: "Aplicação da identidade em peças de comunicação",
              },
              {
                src: "/portfolio/previews/Oportuniza - 4.png",
                caption: "Exploração da linguagem visual do projeto",
              },
              {
                src: "/portfolio/previews/Oportuniza - 5.png",
                caption: "Direção visual do marketplace Oportuniza",
              },
              {
                src: "/portfolio/previews/Oportuniza - 6.png",
                caption: "Elementos visuais da proposta da plataforma",
              },
              {
                src: "/portfolio/previews/Oportuniza - 7.png",
                caption: "Construção da marca e da identidade do produto",
              },
              {
                src: "/portfolio/previews/Oportuniza - 8.png",
                caption: "Aplicação da marca em peças de apoio",
              },
              {
                src: "/portfolio/previews/Oportuniza - 9.png",
                caption: "Composição visual do projeto em diferentes contextos",
              },
              {
                src: "/portfolio/previews/Oportuniza - 10.png",
                caption: "Sistema visual desenvolvido para a marca",
              },
              {
                src: "/portfolio/previews/Oportuniza - 11.png",
                caption: "Organização do conceito e das aplicações visuais",
              },
              {
                src: "/portfolio/previews/Oportuniza - 12.png",
                caption: "Visualização do posicionamento da marca",
              },
              {
                src: "/portfolio/previews/Oportuniza - 13.png",
                caption: "Detalhes da identidade criada para o projeto",
              },
              {
                src: "/portfolio/previews/Oportuniza - 14.png",
                caption: "Representação gráfica da proposta da solução",
              },
              {
                src: "/portfolio/previews/Oportuniza - 15.png",
                caption: "Aplicação do nome e do símbolo da marca",
              },
              {
                src: "/portfolio/previews/Oportuniza - 16.png",
                caption: "Ajustes finais da identidade visual",
              },
              {
                src: "/portfolio/previews/Oportuniza - 17.png",
                caption: "Fechamento visual do projeto Oportuniza",
              },
            ],
            sections: [
              {
                title: "A ideia: aproximar necessidades e oportunidades",
                text: "O Oportuniza nasceu da minha proposta de criar uma solução para conectar quem procura serviços domésticos a quem oferece esses serviços. O TCC explora como tecnologia e comunicação podem organizar essa relação e tornar a proposta compreensível para os dois públicos.",
              },
              {
                title: "Identidade visual criada por mim, do zero",
                text: "Criei a identidade visual completa: conceito do símbolo, construção da marca, paleta, tipografia, versões do logotipo e orientações de aplicação. O manual reúne essas decisões em um sistema visual consistente para o projeto.",
              },
              {
                title: "Um símbolo para crescimento e conexão",
                text: "A marca integra uma figura humana, uma escada e uma seta ascendente à forma circular da letra O. Esses elementos comunicam crescimento, conexão e oportunidade, traduzindo o propósito da plataforma em uma assinatura visual.",
              },
              {
                title: "Cor, tipografia e consistência",
                text: "O azul #1E4F7A transmite confiança; o verde #9ACE5F traz energia e ascensão; o verde #4DA25A representa a conexão entre quem oferece e quem contrata. A tipografia Montserrat e as versões em negativo e escala de cinza completam o sistema de aplicação da marca.",
              },
            ],
          }
        : {}),
    }),
  ),
  ...portfolioMedia.map((m) => item(m.id, m.kind, m.title, m)),
  item("experience-mauro", "experience", "Mauro D’Luka", {
    sort_order: 0,
    date: "Abril de 2026 — atual",
    role: "Social Media e edição",
    description:
      "Atuação na presença digital do artista em redes sociais e plataformas de conteúdo.",
  }),
  item("experience-braba", "experience", "Rádio Braba", {
    sort_order: 1,
    date: "Agosto de 2025 — atual",
    role: "Gerente geral",
    description:
      "Gestão de presença digital, criação de conteúdo, edição e cobertura de eventos.",
  }),
  item("experience-ifnc", "experience", "IFNC", {
    sort_order: 2,
    date: "Início em janeiro de 2025",
    role: "Estágio em Desenvolvimento de Sistemas",
    description:
      "Experiência que ampliou minha atuação entre tecnologia e audiovisual.",
  }),
  item("experience-etec", "experience", "ETEC Salles Gomes", {
    sort_order: 3,
    date: "Conclusão prevista: 2026",
    role: "Formação técnica",
    description:
      "Ensino Médio com habilitação técnica em Desenvolvimento de Sistemas. TCC: Oportuniza.",
  }),
];
export function safeUrl(url: string, contact = false) {
  if (/[\\\u0000-\u001f\u007f]/.test(url)) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const u = new URL(url);
    return ["https:", "http:", ...(contact ? ["mailto:"] : [])].includes(
      u.protocol,
    )
      ? url
      : "";
  } catch {
    return "";
  }
}
