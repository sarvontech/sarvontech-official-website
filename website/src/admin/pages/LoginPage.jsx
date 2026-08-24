import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { useTheme } from '../../context/ThemeContext';
import { Lock, Mail, Loader2, AlertCircle, ArrowRight, Sun, Moon } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signInWithEmail } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-8 shadow-2xl space-y-6 relative">
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[var(--color-brand)]" />}
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-brand)] to-[var(--color-accent-mint)] p-0.5 mx-auto shadow-lg">
            <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-[14px] flex items-center justify-center overflow-hidden p-1">
              <img src="/assets/images/logo-remove-bg.png" alt="ServonTech Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--color-text-primary)] tracking-tight">ServonTech Admin</h1>
            <p className="text-xs font-mono text-[var(--color-text-secondary)]">Production Control & Operations Portal</p>
          </div>
        </div>

        {/* Configuration Notice if Supabase environment variables are unconfigured */}
        {!isSupabaseConfigured && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-500">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Production Configuration Alert</span>
            </div>
            <p className="leading-relaxed">
              Required production environment variables are missing in Vercel. Please set <code className="bg-black/20 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> and <code className="bg-black/20 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code> in Vercel Project Settings.
            </p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[var(--color-text-secondary)] font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              <span>Admin Email</span>
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sarvontech.com"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-brand)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[var(--color-text-secondary)] font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              <span>Password</span>
            </label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-brand)] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] disabled:opacity-50 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Admin Control</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">
            Protected by PostgreSQL Row Level Security (RLS) & TLS 1.3
          </p>
        </div>

      </div>
    </div>
  );
}
