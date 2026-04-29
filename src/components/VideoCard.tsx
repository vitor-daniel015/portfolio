import { Trash2, Play, ArrowRight, ExternalLink } from 'lucide-react';
import { VideoEntry } from '../types';

interface VideoCardProps {
  video: VideoEntry;
  isAdmin: boolean;
  onDelete: () => void;
  isWide: boolean;
}

export function VideoCard({ video, isAdmin, onDelete, isWide }: VideoCardProps) {
  return (
    <div className={`
      ${isWide ? 'md:col-span-1' : ''}
      relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 
      aspect-9/16 md:aspect-auto md:h-125
      transition-all duration-500 hover:border-street-green/30
    `}>
      {/* Background Graphic */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-street-green rounded-full animate-pulse" />
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Rec_Mode</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">00:00:24:12</span>
      </div>

      {video.thumbnail ? (
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-zinc-950 flex items-center justify-center opacity-70">
           <Play className="text-white/10 w-20 h-20" />
        </div>
      )}

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/20 to-transparent flex flex-col justify-end p-6 md:p-8">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-0.5 bg-street-green/10 text-street-green text-[9px] font-mono uppercase tracking-widest rounded-md border border-street-green/20">
              {video.category}
            </span>
            {isAdmin && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-zinc-500 hover:text-red-500 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight line-clamp-2">{video.title}</h3>
          
          {video.description && (
            <p className="text-zinc-400 text-xs mb-4 line-clamp-2 italic font-serif opacity-0 group-hover:opacity-100 transition-opacity delay-100">
              {video.description}
            </p>
          )}

          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-street-green group-hover:gap-3 transition-all"
          >
            ASSISTIR <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Frame Corners */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[2.5rem]" />
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-street-green/30 rounded-tl-[2.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-street-green/30 rounded-br-[2.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
