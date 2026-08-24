/**
 * Environment & Configuration Layer for SarvonTech
 * Handles runtime detection and validation of Vite environment variables.
 */

function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  // Support both legacy (VITE_SUPABASE_ANON_KEY) and publishable key models (VITE_SUPABASE_PUBLISHABLE_KEY)
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

  const trimmedUrl = typeof url === 'string' ? url.trim() : '';
  const trimmedKey = typeof key === 'string' ? key.trim() : '';

  // Validate presence and format without throwing top-level uncaught exceptions
  const isValidUrl = Boolean(trimmedUrl && (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')));
  const isValidKey = Boolean(trimmedKey && trimmedKey.length > 5);

  const isConfigured = isValidUrl && isValidKey;

  return {
    url: isConfigured ? trimmedUrl : '',
    key: isConfigured ? trimmedKey : '',
    isConfigured
  };
}

export const envConfig = {
  supabase: getSupabaseConfig(),
  isProduction: import.meta.env.MODE === 'production',
  isDev: import.meta.env.MODE === 'development'
};
