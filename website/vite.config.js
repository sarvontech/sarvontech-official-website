import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('\n================================================================');
    console.warn('⚠️  [Vite Build Notice] Supabase environment variables missing from build environment!');
    console.warn('   Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY)');
    console.warn('   are configured in Vercel Project Settings -> Environment Variables.');
    console.warn('================================================================\n');
  }

  return {
    plugins: [react()],
  };
});
