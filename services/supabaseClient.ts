import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey) 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

export const supabaseError = (!supabaseUrl || !supabaseAnonKey)
    ? "Authentication is currently disabled. The Supabase environment variables have not been configured for this deployment."
    : null;
