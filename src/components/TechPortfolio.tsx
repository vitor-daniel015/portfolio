import { motion } from 'motion/react';
import {
  useNavigate,
} from 'react-router-dom';
import {
  Github,
  Code2,
  ArrowRight,
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';



export function TechPortfolio() {
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
          <p className="text-xl sm:text-2xl font-light leading-relaxed text-zinc-200">
            "Desenvolvedor curioso apaixonado por tecnologia e inovação. Sempre em busca de novas colaborações e experiências!"
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