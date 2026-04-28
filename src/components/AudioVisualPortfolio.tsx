import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Instagram,
  Video,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '../utils/supabase';

export function AudioVisualPortfolio() {
  const [videos, setVideos] = useState<VideoProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

interface VideoProject {
  id: string;
  title: string;
  role: string;
  thumbnail_url: string;
  video_url: string;
}

  useEffect(() => {
    async function fetchVideos() {
      try {
        // Busca os dados da tabela 'videos_portfolio' ordenando pelos mais recentes
        const { data, error } = await supabase
          .from('videos_portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setVideos(data);
      } catch (error) {
        console.error("Erro ao buscar vídeos do Supabase:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-8 h-8 border-2 border-street-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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