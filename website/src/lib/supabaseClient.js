import { createClient } from '@supabase/supabase-js';
import { envConfig } from '../config/env';

/**
 * Creates a safe fallback proxy client when Supabase environment variables are missing.
 * Prevents top-level crashes (`Uncaught Error: supabaseKey is required`) and blank pages.
 */
function createProxySupabaseClient() {
  const notConfiguredError = new Error(
    'Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_PUBLISHABLE_KEY) are missing.'
  );

  const dummyChain = {
    select: () => dummyChain,
    insert: () => dummyChain,
    upsert: () => dummyChain,
    update: () => dummyChain,
    delete: () => dummyChain,
    eq: () => dummyChain,
    neq: () => dummyChain,
    in: () => dummyChain,
    ilike: () => dummyChain,
    gte: () => dummyChain,
    lte: () => dummyChain,
    range: () => dummyChain,
    filter: () => dummyChain,
    contains: () => dummyChain,
    order: () => dummyChain,
    limit: () => dummyChain,
    maybeSingle: () => Promise.resolve({ data: null, error: notConfiguredError }),
    single: () => Promise.resolve({ data: null, error: notConfiguredError }),
    then: (resolve) => resolve({ data: null, error: notConfiguredError })
  };

  return {
    from: () => dummyChain,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: notConfiguredError }),
      signUp: () => Promise.resolve({ data: null, error: notConfiguredError }),
      signOut: () => Promise.resolve({ error: null }),
      updateUser: () => Promise.resolve({ data: null, error: notConfiguredError })
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: notConfiguredError }),
        download: () => Promise.resolve({ data: null, error: notConfiguredError }),
        remove: () => Promise.resolve({ data: null, error: notConfiguredError }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        createSignedUrl: () => Promise.resolve({ data: null, error: notConfiguredError })
      })
    }
  };
}

export const isSupabaseConfigured = envConfig.supabase.isConfigured;

export const supabase = isSupabaseConfigured
  ? createClient(envConfig.supabase.url, envConfig.supabase.key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  : createProxySupabaseClient();
