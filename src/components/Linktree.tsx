import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  MessageCircle, 
  Code2, 
  Video as VideoIcon, 
  ArrowRight,
  LogOut,
  Lock
} from 'lucide-react';

interface LinktreeProps {
  isAdmin: boolean;
  logout: () => void;
  login: (p: string) => boolean;
}

export function Linktree({ isAdmin, logout, login }: LinktreeProps) {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

  const links = [
    { 
      title: 'Fale comigo no WhatsApp', 
      url: 'https://wa.me/5515998135891', 
      icon: <MessageCircle className="w-5 h-5" />, 
      color: 'bg-[#25D366]',
      delay: 0.1
    },
    { 
      title: 'Meu GitHub', 
      url: 'https://github.com/vitor-daniel015', 
      icon: <Github className="w-5 h-5" />, 
      color: 'bg-[#24292e]',
      delay: 0.2
    },
    { 
      title: 'LinkedIn Profissional', 
      url: 'https://www.linkedin.com/in/vitor-daniel-04b3a123a/', 
      icon: <Linkedin className="w-5 h-5" />, 
      color: 'bg-[#0077B5]',
      delay: 0.3
    },
    { 
      title: 'Instagram Creative', 
      url: 'https://www.instagram.com/vitor__daniell/', 
      icon: <Instagram className="w-5 h-5" />, 
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      delay: 0.4
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowPasswordInput(false);
      setPassword('');
    } else {
      alert('Senha incorreta');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md mx-auto px-6 pt-20 pb-16 flex flex-col items-center"
    >
      <div className="absolute top-6 right-6">
        {!isAdmin ? (
          <div className="flex flex-col items-end gap-2">
            {!showPasswordInput ? (
              <button 
                onClick={() => setShowPasswordInput(true)}
                className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-1"
              >
                <Lock size={10} /> Admin
              </button>
            ) : (
              <form onSubmit={handleLogin} className="flex items-center gap-2 bg-concrete/20 p-1 rounded-full border border-white/10 backdrop-blur-sm animate-in fade-in slide-in-from-right-4">
                <input 
                  autoFocus
                  type="password"
                  placeholder="Senha"
                  className="bg-transparent border-none outline-none text-[10px] font-mono px-3 py-1 w-24 text-white"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" className="text-[10px] bg-street-green text-obsidian px-3 py-1 rounded-full font-bold uppercase tracking-widest">OK</button>
                <button type="button" onClick={() => setShowPasswordInput(false)} className="text-[10px] text-zinc-500 px-2 uppercase font-bold">X</button>
              </form>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4 bg-concrete/20 py-2 px-4 rounded-full border border-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-street-green uppercase tracking-widest">LOGADO</span>
            <button 
              onClick={logout}
              className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <LogOut size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative mb-12"
      >
        <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-street-blue/30 shadow-2xl relative z-10">
          <img 
            src="https://github.com/vitor-daniel015.png" 
            alt="Vitor Daniel" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-street-blue/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-street-green/10 rounded-full blur-2xl"></div>
      </motion.div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Vitor Daniel</h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">Fullstack Dev & Filmmaker</p>
      </div>

      {/* Navigation Buttons */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3 w-full mb-10"
      >
          <Link 
            to="/audiovisual"
            className="glass-card py-5 rounded-2xl flex flex-col items-center gap-2 hover:bg-concrete transition-all cursor-pointer group"
          >
            <VideoIcon className="w-5 h-5 text-zinc-500 group-hover:text-street-green transition-colors" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">Prod. Audio</span>
          </Link>
        <Link 
          to="/tech"
          className="glass-card py-5 rounded-2xl flex flex-col items-center gap-2 hover:bg-concrete transition-all cursor-pointer group"
        >
          <Code2 className="w-5 h-5 text-zinc-500 group-hover:text-street-blue transition-colors" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">Software Dev</span>
        </Link>
      </motion.div>

      {/* Social Links */}
      <div className="w-full space-y-3">
        {links.map((link) => (
          <motion.a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: link.delay }}
            className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:bg-concrete transition-all group cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${link.color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
              {link.icon}
            </div>
            <span className="flex-1 font-bold text-sm tracking-tight">{link.title}</span>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center">
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Daniel Portfolio © 2026</p>
      </footer>
    </motion.div>
  );
}
