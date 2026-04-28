import { motion, AnimatePresence } from 'motion/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link
} from 'react-router-dom';
import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Code2,
  Video,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { image } from 'framer-motion/client';

// --- Main App Component ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-obsidian text-white selection:bg-street-blue/30 overflow-x-hidden">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Linktree />} />
        <Route path="/tech" element={<TechPortfolio />} />
        <Route path="/audiovisual" element={<AudioVisualPortfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </AnimatePresence>
  );
}

// --- Page 1: Index (Linktree Style) ---

function Linktree() {
  const links = [
    {
      title: 'LinkedIn Profissional',
      href: 'https://www.linkedin.com/in/vitor-daniel-b7133b2ab/',
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      title: 'Repositórios GitHub',
      href: 'https://github.com/vitor-daniel015',
      icon: <Github className="w-5 h-5" />
    },
    {
      title: 'Siga no Instagram',
      href: 'https://www.instagram.com/vdzxs015',
      icon: <Instagram className="w-5 h-5" />
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md mx-auto px-6 pt-20 pb-16 flex flex-col items-center"
    >
      {/* Profile Header */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-8 group"
      >
        <div className="absolute -inset-2 bg-linear-to-tr from-street-blue to-street-green opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500 rounded-full"></div>
        <div className="w-28 h-28 rounded-full bg-concrete border-2 border-white/10 overflow-hidden relative flex items-center justify-center p-0.5">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
            <img src="\profile.jpg" alt="profile" className="rounded-[100%] w-25" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Vitor Daniel Alvarez</h1>
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase flex items-center gap-2 justify-center">
          <span className="w-1.5 h-1.5 bg-street-green rounded-full animate-pulse"></span>
          Dev & Filmmaker
        </p>
      </motion.div>

      {/* Primary Call to Action */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full mb-8"
      >
        <Link
          to="/portfolio"
          className="w-full py-5 bg-white text-obsidian rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer group shadow-2xl shadow-street-blue/10"
        >
          <Code2 className="w-5 h-5 text-street-blue" />
          ACESSAR MEU PORTFÓLIO
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full mb-8"
      >
        <Link
          to="https://wa.me/5515998571316?text=Oi%21%20Tudo%20bem%3F%20Quero%20entender%20melhor%20como%20funcionam%20os%20seus%20servi%C3%A7os" target="_blank"
          className="w-full py-5 bg-white text-obsidian rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer group shadow-2xl shadow-street-blue/10"
        >
          <img src="\whatsapp.svg" className="w-5 h-5 text-street-blue" />
          FALE COMIGO NO WHATSAPP
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Dual Identity Switcher */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3 w-full mb-10"
      >
        <Link
          to="/audiovisual"
          className="glass-card py-5 rounded-2xl flex flex-col items-center gap-2 hover:bg-concrete transition-all cursor-pointer group"
        >
          <Video className="w-5 h-5 text-zinc-500 group-hover:text-street-green transition-colors" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">Prod. Audio</span>
        </Link>
        <Link
          to="/tech"
          className="glass-card py-5 rounded-2xl flex flex-col items-center gap-2 hover:bg-concrete transition-all cursor-pointer group"
        >
          <Code2 className="w-5 h-5 text-zinc-500 group-hover:text-street-blue transition-colors" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">Tech / Dev</span>
        </Link>
      </motion.div>

      {/* Secondary Links */}
      <div className="w-full flex flex-col gap-3">
        {links.map((link, idx) => (
          <motion.a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + (idx * 0.1) }}
            className={`
              w-full py-4 px-6 rounded-2xl glass-card flex items-center justify-between group
              hover:bg-white/5 transition-all`}
          >
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 group-hover:text-white transition-colors">
                {link.icon}
              </span>
              <span className="text-sm font-medium tracking-tight text-zinc-200 group-hover:text-white">
                {link.title}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-600 opacity-0 group-hover:opacity-40 transition-opacity" />
          </motion.a>
        ))}
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="mt-20 text-[9px] font-mono tracking-widest uppercase text-zinc-500"
      >
        Daniel // MMXXVI // Build for Impact
      </motion.footer>
    </motion.main>
  );
}

// --- Page 2: Tech Portfolio (Expanded Copy) ---

function TechPortfolio() {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Oportuniza",
      desc: "TCC focado em serviços domésticos. Ideia de startup para centralizar demandas operacionais.",
      tags: ['TCC', 'FULL-STACK', 'UX'],
      link: "#",
      image: "/oportuniza.png"
    },
    {
      title: "Rádio Braba",
      desc: "Plataforma principal em produção. Foco em estabilidade e experiência do ouvinte.",
      tags: ['PRODUÇÃO', 'STREAMING', 'VITE'],
      link: "https://radiobraba.com.br",
      image: "/radiobraba.jpeg"
    },
    {
      title: "JG Modas",
      desc: "E-commerce e catálogo digital com foco total em conversão mobile.",
      tags: ['CATÁLOGO', 'SALES', 'MOBILE-FIRST'],
      link: "https://jgmodas.netlify.app/",
      image: "/jgmodas.jpeg"
    },
    {
      title: "NeoTech",
      desc: "Landing page institucional moderna desenvolvida para trabalho escolar.",
      tags: ['LANDING PAGE', 'FRONT-END', 'ACADÊMICO'],
      link: "https://neotechinformatica.netlify.app/",
      image: "/neotech.jpeg"
    },
    {
      title: "IFNC",
      desc: "Interface web estruturada com foco em acessibilidade e design limpo.",
      tags: ['UI DESIGN', 'CSS3', 'RESPONSIVO'],
      link: "https://ifnc-projeto.netlify.app/",
      image: "/ifnc.jpeg"
    },
    {
      title: "Lanchonete Quevedo",
      desc: "Vitrine online e cardápio digital projetado para impulsionar o alcance digital.",
      tags: ['WEB-APP', 'FRONT-END', 'LOCAL-BUSINESS'],
      link: "https://lanchonete-quevedo.netlify.app/",
      image: "/quevedos.jpeg"
    },
    {
      title: "Cenário Tech",
      desc: "Aplicação de gestão com operações CRUD completas, utilizando Firebase.",
      tags: ['CRUD', 'FIREBASE', 'DATA-MANAGEMENT'],
      link: "https://github.com/vitor-daniel015/Trabalho-DS-Cenario-Tech",
      image: "/cenariotech.jpeg"
    },
    {
      title: "NewsPanel",
      desc: "Automação para broadcast. Consome APIs de notícias em tempo real para GCs.",
      tags: ['BROADCAST TECH', 'API REST', 'AUTOMATION'],
      link: "https://github.com/vitor-daniel015/news_panel"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto px-6 py-20"
    >
      <button 
        onClick={() => navigate('/')} 
        className="mb-12 text-zinc-500 flex items-center gap-2 hover:text-white transition-colors cursor-pointer group font-mono text-sm uppercase tracking-widest"
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
        Back
      </button>

      <header className="mb-20">
        <h2 className="text-6xl font-bold mb-6 tracking-tighter italic">Dev <span className="text-street-blue italic-none not-italic">Sistemas</span></h2>
        <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs">
          <span>ETEC DS // 3º ANO</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span>FULL-STACK</span>
        </div>
      </header>

      <div className="grid gap-16">
        <section className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-street-blue pointer-events-none">
            <Code2 size={120} />
          </div>
          <h3 className="text-street-green font-mono text-xs mb-6 uppercase tracking-[0.3em]">{'@ root/bio'}</h3>
          <p className="text-xl sm:text-2xl font-light leading-relaxed text-zinc-200">
            "Transformo linhas de código em soluções que já estão operando em produção. 
            Minha abordagem une a <span className="text-white font-bold">precisão da engenharia</span> com a 
            <span className="text-street-blue"> estética do audiovisual</span>, entregando valor real para empresas e usuários."
          </p>
        </section>
        
        <section>
          <h3 className="text-xs font-mono font-bold mb-8 uppercase tracking-[0.4em] text-zinc-500">Minha Stack</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'TypeScript', color: 'text-blue-400' },
              { name: 'React', color: 'text-cyan-400' },
              { name: 'Node.js', color: 'text-green-400' },
              { name: 'SQL Systems', color: 'text-orange-400' },
              { name: 'Tailwind CSS', color: 'text-sky-400' },
              { name: 'JavaScript', color: 'text-yellow-400' },
              { name: 'Git/GitHub', color: 'text-white' },
              { name: 'API Design', color: 'text-zinc-500' }
            ].map(t => (
              <div key={t.name} className="glass-card px-4 py-6 rounded-2xl flex flex-col items-center justify-center border-white/5 gap-2 hover:bg-white/5 transition-colors">
                 <span className={`text-sm font-bold tracking-tight ${t.color}`}>{t.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-10">
            <h3 className="text-2xl font-bold tracking-tighter">Projetos em Destaque</h3>
            <span className="text-zinc-500 text-[10px] font-mono uppercase mb-1">Total: {projects.length} Systems</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
             {projects.map((p, idx) => (
                <ProjectCard 
                  key={p.title}
                  title={p.title}
                  desc={p.desc}
                  tags={p.tags}
                  link={p.link}
                  image={p.image}
                  delay={idx * 0.1}
                />
             ))}
             
              <div className="glass-card p-10 rounded-[2.5rem] border-dashed border-zinc-700 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all">
                 <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center mb-6 text-zinc-500 group-hover:bg-street-blue group-hover:text-white transition-all shadow-xl">
                    <Github size={28} />
                 </div>
                 <h4 className="font-bold mb-2">Repositórios Adicionais</h4>
                 <p className="text-zinc-500 text-xs mb-6 max-w-50">Confira outros experimentos e projetos acadêmicos no meu GitHub.</p>
                 <a 
                  href="https://github.com/vitor-daniel015" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-street-blue hover:text-white transition-colors"
                >
                  @vitor-daniel015
                </a>
              </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

interface ProjectCardProps {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  image?: string;
  delay: number;
}

function ProjectCard({ title, desc, tags, link, image, delay }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card rounded-[2.5rem] flex flex-col overflow-hidden hover:border-street-blue/30 transition-all border border-transparent group shadow-2xl bg-concrete/10"
    >
      <div className="h-48 md:h-56 relative overflow-hidden bg-zinc-900/50">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-street-blue/5 to-transparent">
             <div className="w-4/5 h-2/3 bg-obsidian/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500 overflow-hidden">
                <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5 text-[8px] font-mono text-zinc-600">
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                   </div>
                   <span className="ml-2">localhost:3000/{title.toLowerCase()}</span>
                </div>
                <div className="p-4 font-mono text-[9px] text-street-blue/30 overflow-hidden">
                   <code>{`// source: ${title}\n<ctrl42> system_init() {\n  render_ui();\n  sync_data();\n}`}</code>
                </div>
             </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-street-blue/10 backdrop-blur-[2px]">
           <ExternalLink className="w-8 h-8 text-white scale-90 group-hover:scale-100 transition-transform" />
        </div>
      </div>

      <div className="p-8 flex flex-col justify-between flex-1 bg-obsidian/40 backdrop-blur-md border-t border-white/5">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(t => (
              <span key={t} className="text-[9px] font-mono font-bold text-street-blue/80 px-2 py-0.5 rounded-full border border-street-blue/20">{t}</span>
            ))}
          </div>
          <h4 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-street-blue transition-colors">{title}</h4>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium italic">"{desc}"</p>
        </div>
        
        <a 
          href={link === '#' ? undefined : link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`
            text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-between group/btn
            ${link === '#' ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-500 hover:text-white pointer-events-auto'}
          `}
        >
          <span>{link === '#' ? 'Dev Concept' : (link.includes('github') ? 'View Source' : 'Visit Live')}</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

// --- Page 3: AudioVisual Portfolio (Grid Style) ---

function AudioVisualPortfolio() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-5xl mx-auto px-6 py-20"
    >
      <button
        onClick={() => navigate('/')}
        className="mb-12 text-zinc-500 flex items-center gap-2 hover:text-white transition-colors cursor-pointer group font-mono text-sm uppercase tracking-widest"
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <header className="mb-20 text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter uppercase leading-none">
          Audio<br /><span className="text-street-green italic tracking-normal normal-case">Visual</span>
        </h2>
        <p className="text-zinc-500 uppercase tracking-[0.3em] font-mono text-xs">Stories // Color // Motion</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Main highlight */}
        <div className="md:col-span-4 aspect-video bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 relative group cursor-pointer shadow-2xl shadow-black">
          <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/20 to-transparent flex flex-col justify-end p-10 opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono text-street-green mb-3 uppercase tracking-[0.4em] font-bold">Coordenação Live</span>
            <h3 className="text-3xl font-bold mb-3 tracking-tight">Trabalho: Fivelados</h3>
            <p className="text-zinc-400 text-sm max-w-sm mb-6 leading-relaxed italic">
              Operação e direção técnica de transmissão ao vivo em rodeios. O foco está no dinamismo e na captação fiel da emoção da arena.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 glass-card text-[9px] rounded-full uppercase tracking-widest">OBS Studio</span>
              <span className="px-3 py-1 glass-card text-[9px] rounded-full uppercase tracking-widest">Multi-Cam</span>
            </div>
          </div>
        </div>

        {/* Small grids */}
        <div className="md:col-span-2 aspect-square md:aspect-auto glass-card rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center gap-4 group hover:bg-concrete transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-street-green group-hover:scale-110 transition-transform">
            <Video />
          </div>
          <div>
            <h4 className="font-bold mb-1">Filmmaker</h4>
            <p className="text-zinc-500 text-xs tracking-tight italic leading-snug">Ensaios, clipes e vídeos comerciais com estética urbana.</p>
          </div>
        </div>

        {[1, 2, 3].map(i => (
          <div key={i} className="md:col-span-2 aspect-square glass-card rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-800 font-mono text-xs italic group-hover:scale-110 transition-transform">
              PHOTO_REEL_0{i}.JPG
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram size={24} />
            </div>
          </div>
        ))}

        <div className="md:col-span-6 mt-12 py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-sm font-mono tracking-tight underline decoration-street-green/20 underline-offset-8">Disponível para novos projetos de edição e captação.</p>
          <a href="#" className="py-4 px-8 bg-street-green text-obsidian rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-street-green/20 cursor-pointer">
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Renderiza o portfólio de Tech primeiro */}
      <TechPortfolio />

      {/* Um divisor simples para separar as seções, se desejar */}
      <div className="h-px w-full bg-white/5 my-10" />

      {/* Renderiza o portfólio de Audiovisual logo abaixo */}
      <AudioVisualPortfolio />
    </motion.div>
  );
}