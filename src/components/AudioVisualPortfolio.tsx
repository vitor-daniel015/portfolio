import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Video as VideoIcon, Plus, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { getSupabase } from '../utils/supabase';
import { VideoEntry, OperationType } from '../types';
import { handleDataError } from '../utils/errors';
import { VideoCard } from './VideoCard';
import { VideoAddForm } from './VideoAddForm';

export function AudioVisualPortfolio({ isAdmin }: { isAdmin: boolean }) {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Referência para o container do carrossel no mobile
  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchVideos = async () => {
    try {
      const { data, error } = await getSupabase()
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      handleDataError(error, OperationType.LIST, 'videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    
    const supabase = getSupabase();
    const channel = supabase
      .channel('videos_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, () => {
        fetchVideos();
      })
      .subscribe();

    return () => {
      getSupabase().removeChannel(channel);
    };
  }, []);

  // --- LÓGICA DO CARROSSEL (APENAS MOBILE) ---
  const scrollNext = () => {
    if (carouselRef.current && window.innerWidth < 768) { // Só executa no mobile
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // Se chegou no final, volta para o primeiro
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Avança a largura de um card aproximadamente
        carouselRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
      }
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current && window.innerWidth < 768) {
      carouselRef.current.scrollBy({ left: -(carouselRef.current.clientWidth * 0.85), behavior: 'smooth' });
    }
  };

  // Passar automaticamente a cada 10 segundos (só no mobile)
  useEffect(() => {
    const interval = setInterval(() => {
      // Verifica se a tela é menor que 768px (Mobile/Tablet)
      if (window.innerWidth < 768) {
        scrollNext();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  // -------------------------------------------

  const handleDelete = async (id: string) => {
    if (!window.confirm('Excluir este vídeo?')) return;
    try {
      const { error } = await getSupabase()
        .from('videos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      handleDataError(error, OperationType.DELETE, `videos/${id}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-5xl mx-auto px-6 py-20"
    >
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => navigate('/')} 
          className="text-zinc-500 flex items-center gap-2 hover:text-white transition-colors cursor-pointer group font-mono text-sm uppercase tracking-widest"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
          Voltar
        </button>

        {isAdmin && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-street-green text-obsidian rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-street-green/10"
          >
            <Plus size={14} />
            Adicionar Vídeo
          </button>
        )}
      </div>

      <header className="mb-16 text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter uppercase leading-none">
          Audio<br /><span className="text-street-green italic tracking-normal normal-case">Visual</span>
        </h2>
        <p className="text-zinc-500 uppercase tracking-[0.3em] font-mono text-xs">Stories // Color // Motion</p>
      </header>

      <AnimatePresence>
        {showAddForm && (
          <VideoAddForm 
            onClose={() => setShowAddForm(false)} 
            onSuccess={() => setShowAddForm(false)} 
          />
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Destaque Principal */}
        <div className="aspect-video bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 relative group cursor-pointer shadow-2xl shadow-black">
          <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/40 to-transparent flex flex-col justify-end p-10 z-10">
            <span className="text-[10px] font-mono text-street-green mb-3 uppercase tracking-[0.4em] font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Ao Vivo
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-white">Transmissão: Fivelados</h3>
            <p className="text-zinc-300 text-sm max-w-lg mb-6 leading-relaxed italic">
              Operação e direção técnica de transmissão ao vivo em rodeios. O foco está no dinamismo e na captação fiel da emoção da arena.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[9px] rounded-full uppercase tracking-widest border border-white/10">OBS Studio</span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[9px] rounded-full uppercase tracking-widest border border-white/10">Multi-Cam</span>
            </div>
          </div>
          <Link to="https://www.youtube.com/@RodeioFivelados" className="absolute inset-0 z-20"  target="_blank"/>
          <img 
            src="/fivelados.jpg" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
            alt="Fivelados Highlight"
          />
        </div>

        {/* Seção Projetos Recentes */}
        <div className="mt-10 mb-4 flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Smartphone className="text-street-green" /> 
            Projetos Recentes
          </h3>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Vídeo & Motion</span>
        </div>

        {loading ? (
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[85vw] md:min-w-0 aspect-9/16 bg-white/5 animate-pulse rounded-4xl" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="py-20 text-center glass-card rounded-[2.5rem] border-dashed border-zinc-700">
             <VideoIcon className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
             <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Nenhum vídeo catalogado ainda.</p>
             {isAdmin && <p className="text-zinc-600 text-xs mt-2">Clique em "Adicionar Vídeo" para começar.</p>}
          </div>
        ) : (
          <div className="relative w-full">
            
            {/* Seta Esquerda (Aparece SÓ no mobile) */}
            <button 
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-obsidian/80 text-white p-2.5 rounded-full shadow-2xl md:hidden border border-white/10 backdrop-blur-md active:scale-95 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Container Híbrido: Flex/Carrossel no Mobile, Grid de 3 colunas no Desktop */}
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              {videos.map((video) => (
                <div key={video.id} className="min-w-[85vw] sm:min-w-[50vw] md:min-w-0 md:w-auto snap-center shrink-0">
                  <VideoCard 
                    video={video} 
                    isAdmin={isAdmin} 
                    onDelete={() => handleDelete(video.id)} 
                    isWide={false}
                  />
                </div>
              ))}
            </div>

            {/* Seta Direita (Aparece SÓ no mobile) */}
            <button 
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-obsidian/80 text-white p-2.5 rounded-full shadow-2xl md:hidden border border-white/10 backdrop-blur-md active:scale-95 transition-transform"
            >
              <ChevronRight size={20} />
            </button>

          </div>
        )}

        <div className="mt-16 py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-zinc-500 text-sm font-mono tracking-tight underline decoration-street-green/20 underline-offset-8">Disponível para novos projetos de edição e captação.</p>
           <a 
            href="https://wa.me/5515998571316?text=Oi%21%20Tudo%20bem%3F%20Quero%20entender%20melhor%20como%20funcionam%20os%20seus%20servi%C3%A7os" 
            target="_blank"
            className="py-4 px-8 bg-street-green text-obsidian rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-street-green/20 cursor-pointer"
          >
              Solicitar Orçamento
           </a>
        </div>
      </div>
    </motion.div>
  );
}