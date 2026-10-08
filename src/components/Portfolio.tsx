import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Play,
  X,
  Menu,
  Music2,
} from "lucide-react";
import { GalleryGrid } from "./GalleryGrid";
import { featuredWorkTitles } from "../data/featured";
import { MediaViewer } from "./MediaViewer";
import { CaseDetails } from "./CaseDetails";
import { useContent } from "../data/useContent";
import { initialContent, safeUrl } from "../data/content";
import { useWorkDialog } from "./useWorkDialog";
const nav = [
  ["inicio", "Início"],
  ["social", "Social Media"],
  ["criacao", "Design & Audiovisual"],
  ["desenvolvimento", "Desenvolvimento"],
  ["trajetoria", "Trajetória"],
  ["contato", "Contato"],
];
function Picture({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return src && safeUrl(src) && !failed ? (
    <img
      src={safeUrl(src)}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  ) : (
    <div className={"visual-placeholder " + className}>
      <Code2 size={42} aria-hidden="true" />
      <span>{alt}</span>
    </div>
  );
}
function OutLink({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  const href = safeUrl(url, true);
  return href ? (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  ) : null;
}
function Heading({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{number} / PORTFÓLIO</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
export function Portfolio() {
  const { content } = useContent();
  const profile =
    content.find((x) => x.kind === "profile") || initialContent[0];
  const [menu, setMenu] = useState(false);
  const {
    selected,
    setSelected,
    dialog,
    close: closeDetails,
  } = useWorkDialog();
  const location = useLocation();
  useEffect(() => {
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
  }, [location]);
  const cases = content.filter((x) => x.kind === "case");
  const projects = content.filter((x) => x.kind === "project");
  const works = content.filter(
    (x) => ["art", "video"].includes(x.kind) && (x.image || x.video_url),
  );
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <a href="#inicio" className="wordmark">
          Vitor Daniel<span>.</span>
        </a>
        <button
          className="menu-toggle"
          aria-label="Abrir navegação"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          <Menu />
        </button>
        <nav className={menu ? "open" : ""} aria-label="Principal">
          {nav.map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <Link className="header-contact" to="/links">
          Meus links <ArrowUpRight size={16} />
        </Link>
      </header>
      <main id="conteudo" className="portfolio-main">
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="availability-dot" />
              {profile.objective}
            </p>
            <h1>
              {profile.title}
              <span>{profile.role}</span>
            </h1>
            <p className="hero-description">{profile.description}</p>
            <div className="hero-actions">
              <a className="button primary" href="#social">
                Conheça meus projetos <ArrowRight size={18} />
              </a>
              <a className="button secondary" href="#contato">
                Entre em contato <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="hero-location">{profile.client}</p>
          </div>
          <div className="hero-portrait">
            <Picture src={profile.image} alt={profile.title} priority />
          </div>
        </section>
        <div className="discipline-strip">
          <span>Desenvolvimento</span>
          <i /> <span>Social Media</span>
          <i />
          <span>Design</span>
          <i />
          <span>Audiovisual</span>
        </div>
        <section id="social" className="portfolio-section">
          <Heading number="01" title="Presença digital em prática." />
          <div className="case-grid">
            {cases.map((c, i) => (
              <article className="case-card" key={c.id}>
                <div
                  className={
                    "case-visual " +
                    (i === 0 ? "braba" : i === 1 ? "mauro" : "fivelados")
                  }
                >
                  {c.image ? (
                    <Picture src={c.image} alt={c.title} />
                  ) : (
                    <Music2 size={100} strokeWidth={0.8} aria-hidden="true" />
                  )}
                </div>
                <div className="case-body">
                  <p className="eyebrow">{c.client}</p>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className="case-preview-metric">
                    {c.metrics[0] ? (
                      <>
                        <strong>{c.metrics[0].value}</strong>
                        <span>
                          {c.metrics[0].unit} · {c.metrics[0].platform}
                          <small>{c.metrics[0].period}</small>
                        </span>
                      </>
                    ) : (
                      <>
                        <strong>3 dias</strong>
                        <span>de live · Produção em equipe</span>
                      </>
                    )}
                  </div>
                  <div className="case-role">
                    <span>{c.date}</span>
                    <strong>{c.role}</strong>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => setSelected(c)}
                  >
                    Conheça minha atuação <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="criacao" className="portfolio-section">
          <Heading
            number="02"
            title="Design que comunica. Vídeo que conecta."
          />
          <div className="creative-intro">
            <div>
              <Play size={28} aria-hidden="true" />
              <h3>Do planejamento à publicação.</h3>
              <p>
                Artes, stories, reels e cobertura de eventos fazem parte da
                minha atuação. Cada entrega considera o contexto da marca e o
                formato do conteúdo.
              </p>
            </div>
            <div className="creative-tags">
              {[
                "Design para redes sociais",
                "Edição de vídeos",
                "Cobertura de eventos",
                "Conteúdo multiplataforma",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="selected-work-header">
            <p className="eyebrow">SELEÇÃO DE TRABALHOS</p>
            <h3>Criação em destaque.</h3>
          </div>
          <GalleryGrid
            mosaic
            items={featuredWorkTitles.flatMap((title) => {
              const work = works.find((item) => item.title === title);
              return work ? [work] : [];
            })}
            onSelect={setSelected}
          />
          <div className="see-all-work">
            <Link className="button primary" to="/trabalhos">
              Ver todos os trabalhos <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <section id="desenvolvimento" className="portfolio-section">
          <Heading number="03" title="Ideias que ganham interface." />
          {projects[0]?.title === "Oportuniza" && (
            <article className="featured-project">
              <Picture
                src="/portfolio/previews/Oportuniza%20-%201.png"
                alt="Oportuniza"
              />
              <div>
                <p className="eyebrow">EM DESTAQUE / TCC</p>
                <h3>Oportuniza</h3>
                <p>{projects[0].description}</p>
                <p className="project-role">
                  Ideia e identidade visual por Vitor Daniel · TCC em equipe
                </p>
                <button
                  className="button primary"
                  onClick={() => setSelected(projects[0])}
                >
                  Conheça o projeto <ArrowUpRight size={18} />
                </button>
              </div>
            </article>
          )}
          <div className="project-grid">
            {projects.map((p) => (
              <article className="project-card" key={p.id}>
                <button
                  className="project-image"
                  aria-label={"Ver detalhes de " + p.title}
                  onClick={() => setSelected(p)}
                >
                  <Picture src={p.image} alt={"Projeto " + p.title} />
                </button>
                <div className="project-body">
                  <p className="eyebrow">
                    {p.tools.includes("ACADÊMICO")
                      ? "PROJETO ACADÊMICO"
                      : p.title === "Oportuniza"
                        ? "TCC · IDENTIDADE & PRODUTO"
                        : "DESENVOLVIMENTO"}
                  </p>
                  <p className="project-tech">{p.tools}</p>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="project-links">
                    <button
                      className="text-button"
                      onClick={() => setSelected(p)}
                    >
                      Detalhes <ArrowUpRight size={16} />
                    </button>
                    <OutLink url={p.url}>
                      {p.url.includes("github.com")
                        ? "Repositório"
                        : "Visitar projeto"}
                    </OutLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="trajetoria" className="portfolio-section">
          <Heading number="04" title="Entre tecnologia e criação." />
          <div className="trajectory-grid">
            <div className="about-copy">
              <h3>Uma visão que conecta os dois lados.</h3>
              <p>
                Meu interesse por tecnologia começou cedo. Na ETEC e no estágio
                em desenvolvimento, encontrei caminhos para transformar ideias
                em soluções digitais. O design e o audiovisual ampliaram essa
                atuação.
              </p>
              <p>
                Hoje, trabalho entre plataformas, conteúdo e edição,
                acompanhando diferentes etapas da presença digital de uma marca.
              </p>
              <h4>Ferramentas & competências</h4>
              <div className="skill-tags">
                {profile.tools.split(",").map((t) => (
                  <span key={t}>{t.trim()}</span>
                ))}
              </div>
              <p className="language">{profile.credits}</p>
            </div>
            <ol className="timeline">
              {content
                .filter((x) => x.kind === "experience")
                .map((e) => (
                  <li key={e.id}>
                    <span>{e.date}</span>
                    <h3>{e.title}</h3>
                    <strong>{e.role}</strong>
                    <p>{e.description}</p>
                  </li>
                ))}
            </ol>
          </div>
        </section>
        <section id="contato" className="contact-section">
          <p className="eyebrow">PRÓXIMO PASSO</p>
          <h2>
            Vamos construir
            <br />
            <span>algo juntos?</span>
          </h2>
          <p>
            Oportunidades profissionais, criação de conteúdo ou desenvolvimento
            de um projeto. Vamos conversar sobre o que você precisa.
          </p>
          <div className="contact-links">
            {profile.links.map((l) => (
              <OutLink key={l.label} url={l.url}>
                {l.label}
              </OutLink>
            ))}
          </div>
          <p className="hero-location">
            {profile.client} · Disponibilidade de horário
          </p>
        </section>
      </main>
      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {profile.title}
        </span>
        <span>Desenvolvimento · Social Media · Audiovisual</span>
        <a href="#inicio">Voltar ao início</a>
      </footer>
      <dialog
        ref={dialog}
        className={
          selected?.kind === "video" || selected?.kind === "art"
            ? "video-lightbox"
            : "detail-dialog"
        }
        aria-label={selected?.title}
        onClose={closeDetails}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDetails();
        }}
      >
        <button
          className="dialog-close"
          onClick={closeDetails}
          aria-label="Fechar detalhes"
        >
          <X />
        </button>
        {selected && (selected.kind === "video" || selected.kind === "art") ? (
          <MediaViewer key={selected.id} item={selected} />
        ) : (
          selected && <CaseDetails key={selected.id} item={selected} />
        )}
      </dialog>
    </>
  );
}
