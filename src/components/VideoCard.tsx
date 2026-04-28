import { Trash2, Play, ArrowRight } from 'lucide-react';
import { VideoEntry } from '../types';

interface VideoCardProps {
  video: VideoEntry;
  isAdmin: boolean;
  onDelete: () => void;
  isWide: boolean;
  key?: string | number;
}

export function VideoCard({ video, isAdmin, onDelete, isWide }: VideoCardProps) {
  return (
    <div className={`
      ${isWide ? 'md:col-span-4' : 'md:col-span-2'}
      aspect-video md:aspect-auto ${!isWide ? 'md:h-80' : 'md:h-96'}
      bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 relative group shadow-2xl shadow-black
    `}>
      {video.thumbnail ? (
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
           <Play className="text-zinc-800 w-20 h-20" />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/10 to-transparent flex flex-col justify-end p-8 opacity-90 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-street-green uppercase tracking-[0.4em] font-bold">
            {video.category}
          </span>
          {isAdmin && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-zinc-500 hover:text-red-500 transition-colors p-2 glass-card rounded-full cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
        <h3 className={`${isWide ? 'text-3xl' : 'text-xl'} font-bold mb-2 tracking-tight group-hover:text-street-green transition-colors`}>{video.title}</h3>
        {video.description && isWide && (
          <p className="text-zinc-400 text-sm max-w-sm mb-4 leading-relaxed line-clamp-2 italic">"{video.description}"</p>
        )}
        <a 
          href={video.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 hover:text-white transition-all group/link"
        >
          <span>Assistir Vídeo</span>
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
