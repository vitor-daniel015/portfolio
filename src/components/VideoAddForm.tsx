import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { getSupabase } from '../utils/supabase';
import { handleDataError } from '../utils/errors';
import { OperationType } from '../types';

interface VideoAddFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function VideoAddForm({ onClose, onSuccess }: VideoAddFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    thumbnail: '',
    description: '',
    category: 'filmmaker' as const
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await getSupabase()
        .from('videos')
        .insert([{
          ...formData,
          created_at: new Date().toISOString()
        }]);
      
      if (error) throw error;
      onSuccess();
    } catch (error) {
      handleDataError(error, OperationType.CREATE, 'videos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-obsidian/90 backdrop-blur-md"
      ></motion.div>
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative glass-card w-full max-w-lg p-10 rounded-[2.5rem] shadow-2xl border-white/10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors cursor-pointer">
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold mb-8 tracking-tighter">Novo Vídeo</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Título do Projeto</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Rodeio de Fivelados 2024" 
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-street-blue outline-none transition-all placeholder:text-zinc-700"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">URL do Vídeo</label>
              <input 
                required
                type="url" 
                placeholder="YouTube / Vimeo Link" 
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-street-blue outline-none transition-all placeholder:text-zinc-700 text-sm"
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Thumbnail URL</label>
              <input 
                type="url" 
                placeholder="https://..." 
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-street-blue outline-none transition-all placeholder:text-zinc-700 text-sm"
                value={formData.thumbnail}
                onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Categoria</label>
            <select 
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-street-green outline-none transition-all text-sm appearance-none"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as any })}
            >
              <option value="filmmaker">Filmmaker / Edição</option>
              <option value="livestream">Transmissão ao Vivo</option>
              <option value="editing">Somente Edição</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Descrição</label>
            <textarea 
              rows={3} 
              placeholder="Conte brevemente sobre o trabalho..." 
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-street-blue outline-none transition-all placeholder:text-zinc-700 resize-none text-sm"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-street-green text-obsidian rounded-2xl font-bold uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 mt-4 cursor-pointer shadow-xl shadow-street-green/10"
          >
            {loading ? 'PUBLICANDO...' : 'PUBLICAR VÍDEO'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
