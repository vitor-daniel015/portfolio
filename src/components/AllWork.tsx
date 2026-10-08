import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { useContent } from "../data/useContent";
import { GalleryGrid } from "./GalleryGrid";
import { MediaViewer } from "./MediaViewer";
import { useWorkDialog } from "./useWorkDialog";
export function AllWork() {
  const { content } = useContent();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const { selected, setSelected, dialog, close } = useWorkDialog();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const items = content.filter((i) => ["art", "video"].includes(i.kind));
  const visible = items.filter(
    (i) =>
      (category === "all" || i.kind === category) &&
      (i.title + " " + i.description + " " + i.client)
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")),
  );
  return (
    <>
      <header className="site-header">
        <Link to="/portfolio" className="wordmark">
          Vitor Daniel<span>.</span>
        </Link>
        <Link to="/portfolio" className="text-button">
          <ArrowLeft size={16} />
          Voltar ao portfólio
        </Link>
      </header>
      <main className="all-work-main">
        <section className="all-work-intro">
          <p className="eyebrow">ARQUIVO CRIATIVO / VITOR DANIEL</p>
          <h1>
            Ideias, imagens.
            <br />
            <span>Trabalho em movimento.</span>
          </h1>
          <p>
            Explore minhas artes e edições de vídeo. Cada trabalho conta uma
            parte da minha trajetória.
          </p>
        </section>
        <div className="explore-toolbar">
          <div className="filters" aria-label="Categorias">
            {[
              ["all", "Todos"],
              ["art", "Artes"],
              ["video", "Vídeos"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
                className={category === value ? "active" : ""}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="gallery-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Buscar trabalho"
              aria-label="Buscar trabalho"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="gallery-count" role="status">
          {visible.length} trabalhos
        </p>
        {visible.length ? (
          <GalleryGrid items={visible} onSelect={setSelected} />
        ) : (
          <div className="gallery-empty">
            <h2>Nenhum trabalho encontrado.</h2>
            <p>Experimente outro termo ou categoria.</p>
          </div>
        )}
        <div className="archive-footer">
          <Link to="/portfolio#contato" className="button primary">
            Vamos conversar
          </Link>
          <Link to="/portfolio" className="text-button">
            Voltar ao portfólio
          </Link>
        </div>
      </main>
      <dialog
        ref={dialog}
        className="video-lightbox"
        aria-label={selected?.title}
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button
          className="dialog-close"
          onClick={close}
          aria-label="Fechar detalhes"
        >
          <X />
        </button>
        {selected && <MediaViewer key={selected.id} item={selected} />}
      </dialog>
    </>
  );
}
