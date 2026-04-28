import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Code2, 
  Video, 
  ArrowRight,
  LogOut,
  ExternalLink
} from 'lucide-react';

export function Linktree({ user, onLogin, onLogout }: any) {  const links = [
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
        <div className="w-45 h-45 rounded-full bg-concrete border-2 border-white/10 overflow-hidden relative flex items-center justify-center p-0.5">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
            <img src="\profile.jpg" alt="profile" className="rounded-[100%] w-45 h-45" />
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

      <button 
        onClick={user ? onLogout : onLogin}
        className="mt-10 text-[10px] font-mono uppercase tracking-widest text-zinc-700 hover:text-zinc-400 transition-colors cursor-pointer"
      >
        {user ? '[ Sair do Modo Admin ]' : '[ Admin Access ]'}
      </button>
      
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