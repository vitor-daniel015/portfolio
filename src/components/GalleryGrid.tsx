import { ArrowUpRight, Play, Code2 } from "lucide-react";
import { safeUrl, type ContentItem } from "../data/content";
export const categoryLabel = (kind: string) =>
  ({
    art: "Design",
    video: "Audiovisual",
    project: "Desenvolvimento",
    case: "Social Media & produção",
  })[kind] || "Portfólio";
export function GalleryGrid({
  items,
  onSelect,
  mosaic = false,
}: {
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  mosaic?: boolean;
}) {
  return (
    <div className={mosaic ? "selected-mosaic" : "explore-grid"}>
      {items.map((item) => {
        const contents = (
          <>
            <div className="gallery-artwork">
              {item.image ? (
                <img
                  src={safeUrl(item.image)}
                  alt={item.title}
                  loading="lazy"
                />
              ) : (
                <div className="gallery-fallback">
                  <Code2 size={40} />
                  <span>{item.title}</span>
                </div>
              )}
              {item.kind === "video" && (
                <span className="gallery-video-icon">
                  <Play size={18} />
                </span>
              )}
              <div className="gallery-overlay">
                <span>{categoryLabel(item.kind)}</span>
                <h3>{item.title}</h3>
                <ArrowUpRight size={23} />
              </div>
            </div>
            {!mosaic && (
              <div className="gallery-caption">
                <h3>{item.title}</h3>
                <span>
                  {categoryLabel(item.kind)}
                  {item.tools.includes("ACADÊMICO")
                    ? " · Projeto acadêmico"
                    : ""}
                </span>
              </div>
            )}
          </>
        );
        return item.kind === "project" && item.title !== "Oportuniza" ? (
          <a
            key={item.id}
            className="gallery-tile"
            href={safeUrl(item.url)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={"Visitar " + item.title}
          >
            {contents}
          </a>
        ) : (
          <button
            key={item.id}
            className="gallery-tile"
            onClick={() => onSelect(item)}
            aria-label={"Ver " + item.title}
          >
            {contents}
          </button>
        );
      })}
    </div>
  );
}
