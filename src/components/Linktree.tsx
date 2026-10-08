import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import { initialContent } from "../data/content";
export function Linktree() {
  const profile = initialContent.find((i) => i.kind === "profile")!;
  return (
    <main className="bio-page">
      <div className="bio-card">
        <img className="bio-photo" src={profile.image} alt="Vitor Daniel" />
        <p className="eyebrow">TECNOLOGIA + CRIAÇÃO</p>
        <h1>
          Vitor Daniel<span>.</span>
        </h1>
        <p className="bio-description">
          Desenvolvimento, Social Media
          <br />e Audiovisual.
        </p>
        <Link className="bio-primary" to="/portfolio">
          Conheça meu portfólio <ArrowRight size={20} />
        </Link>
        <a
          className="bio-link"
          href="https://wa.me/5515998571316"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vamos conversar <ArrowUpRight size={18} />
        </a>
        <div className="bio-categories">
          <Link to="/portfolio#social">
            Social Media <ArrowUpRight size={15} />
          </Link>
          <Link to="/portfolio#criacao">
            Design & Vídeo <ArrowUpRight size={15} />
          </Link>
          <Link to="/portfolio#desenvolvimento">
            Desenvolvimento <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="bio-socials">
          <a
            href="https://github.com/vitor-daniel015"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/vitor-daniel-b7133b2ab/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
          <a
            href="https://www.instagram.com/vdzxs015"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
          <a href="mailto:vi.daniel16@gmail.com" aria-label="E-mail">
            <Mail />
          </a>
        </div>
        <p className="hero-location">Região de Sorocaba · São Paulo</p>
        <footer>Vitor Daniel © {new Date().getFullYear()}</footer>
      </div>
    </main>
  );
}
