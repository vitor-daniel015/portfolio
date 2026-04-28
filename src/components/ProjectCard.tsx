import { motion } from 'motion/react';
import {
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ProjectCardProps } from '../types';

export function ProjectCard({ title, desc, tags, link, image, delay }: ProjectCardProps) {
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