import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
  const supabaseKey = (import.meta as any).env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key are required. Please configure them in the application settings.');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
};

// For backward compatibility while I update other files
export const supabase = (import.meta as any).env.VITE_SUPABASE_URL 
  ? createClient((import.meta as any).env.VITE_SUPABASE_URL, (import.meta as any).env.VITE_SUPABASE_PUBLISHABLE_KEY)
  : null;
