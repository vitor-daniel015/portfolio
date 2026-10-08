import { useState } from "react";
import {
  ArrowUpRight,
  Play,
  Palette,
  Users,
  Target,
  type LucideIcon,
} from "lucide-react";
import { safeUrl, type ContentItem } from "../data/content";
export function CaseDetails({ item }: { item: ContentItem }) {
  const [photo, setPhoto] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const gallery = item.gallery || [];
  const facts: [string, string, LucideIcon][] = [
    ["Objetivo", item.objective, Target],
    ["Minha participação", item.role, Users],
    ["Entregas", item.format, Palette],
  ];
  return (
    <div
      className={
        "case-detail-layout " +
        (item.id === "project-0" ? "identity-detail" : "")
      }
    >
      <div className="detail-cover">
        {item.image && <img src={safeUrl(item.image)} alt={item.title} />}
        <div>
          <p className="eyebrow">
            {item.client ||
              (item.kind === "project"
                ? "DESENVOLVIMENTO & IDENTIDADE"
                : "DESIGN & AUDIOVISUAL")}
          </p>
          <h2>{item.title}</h2>
          <p>{item.role}</p>
        </div>
      </div>
      <div className="case-detail-inner">
        <div className="detail-summary">
          <p>{item.description}</p>
          {item.date && <span className="detail-date">{item.date}</span>}
        </div>
        {item.video_url && (
          <section className="detail-video">
            <p className="eyebrow">
              <Play size={14} /> ASSISTA AO TRABALHO
            </p>
            <video
              key={item.id}
              controls
              playsInline
              preload="none"
              poster={safeUrl(item.image)}
              src={safeUrl(item.video_url)}
              onError={() => setVideoError(true)}
            />
            {videoError && (
              <p>
                Seu navegador não conseguiu reproduzir este formato. Abra o
                arquivo para assistir em outro player.
              </p>
            )}
            <a
              className="text-button"
              href={safeUrl(item.video_url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir vídeo <ArrowUpRight size={16} />
            </a>
          </section>
        )}
        <div className="detail-facts">
          {facts
            .filter(([, text]) => text)
            .map(([title, text, Icon]) => {
              const Symbol = Icon;
              return (
                <article key={String(title)}>
                  <Symbol size={20} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
        </div>
        {item.sections?.map((section, index) => (
          <section className="detail-story" key={section.title}>
            <span>0{index + 1}</span>
            <div>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </div>
          </section>
        ))}
        {item.id === "project-0" && (
          <div className="brand-swatches">
            {[
              ["#1E4F7A", "Azul Profundeza"],
              ["#9ACE5F", "Verde Broto"],
              ["#4DA25A", "Verde Herbal"],
            ].map(([hex, name]) => (
              <div key={hex}>
                <span style={{ background: hex }} />
                <strong>{name}</strong>
                <small>{hex}</small>
              </div>
            ))}
          </div>
        )}
        {item.metrics.length > 0 && (
          <section className="detail-results">
            <p className="eyebrow">RESULTADOS DOCUMENTADOS</p>
            <h3>A presença em números.</h3>
            <div className="metric-grid">
              {item.metrics
                .filter((m) => m.confirmed && m.period && m.source)
                .map((m, index) => (
                  <article key={index}>
                    <span>{m.platform}</span>
                    <strong>{m.value}</strong>
                    <h4>{m.unit}</h4>
                    <p>{m.period}</p>
                    <small>{m.context}</small>
                    <details>
                      <summary>Fonte</summary>
                      <p>{m.source}</p>
                    </details>
                  </article>
                ))}
            </div>
          </section>
        )}
        {gallery.length > 0 && (
          <section className="detail-gallery">
            <p className="eyebrow">
              {item.id === "project-0"
                ? "CONSTRUÇÃO DA MARCA"
                : "SELEÇÃO VISUAL"}
            </p>
            <h3>
              {item.id === "project-0"
                ? "Do conceito ao sistema visual."
                : "Conteúdo em contexto."}
            </h3>
            {item.id === "project-0" ? (
              <div className="manual-pages">
                {gallery.map((image, index) => (
                  <figure key={image.src}>
                    <img
                      src={safeUrl(image.src)}
                      alt={
                        image.caption ||
                        `Manual Oportuniza — página ${index + 1}`
                      }
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            ) : (
              <>
                <figure>
                  <img
                    src={safeUrl(gallery[photo]?.src || gallery[0].src)}
                    alt={gallery[photo]?.caption || item.title}
                  />
                </figure>
                <div className="gallery-thumbs">
                  {gallery.map((image, i) => (
                    <button
                      key={image.src}
                      className={photo === i ? "active" : ""}
                      aria-pressed={photo === i}
                      aria-label={
                        image.caption || `Ver foto ${i + 1} de ${item.title}`
                      }
                      onClick={() => setPhoto(i)}
                    >
                      <img src={safeUrl(image.src)} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
        {item.credits && (
          <aside className="detail-credits">
            <Users size={18} />
            <div>
              <h3>Créditos</h3>
              <p>{item.credits}</p>
            </div>
          </aside>
        )}
        <div className="contact-links">
          {[
            ...(item.url ? [{ label: "Visitar projeto", url: item.url }] : []),
            ...item.links,
          ].map(
            (link) =>
              safeUrl(link.url) && (
                <a
                  key={link.url}
                  href={safeUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <ArrowUpRight size={16} />
                </a>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
