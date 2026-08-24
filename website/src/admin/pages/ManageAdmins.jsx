import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  UserCheck, 
  Loader2, 
  Check, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export default function ManageAdmins() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'admin'
          }
        }
      });

      if (signUpErr) throw signUpErr;

      setSuccessMsg(`Admin account created for ${email}! They can now log in at /admin/login.`);
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      setError(err.message || 'Failed to create admin user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <UserPlus className="w-4 h-4" />
            <span>SECURITY & TEAM CONTROL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Manage Admin Team</h1>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--color-brand-light)] border border-[var(--color-border)] text-[var(--color-brand)] text-xs font-mono font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Active Super Admin Access</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Add New Admin Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-6 shadow-md">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Add New Admin User</h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Create an administrative account for team members to manage website content.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateAdmin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[var(--color-text-secondary)] font-mono">Full Name</label>
              <input 
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Hariom Deokar"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[var(--color-text-secondary)] font-mono">Admin Email *</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sarvontech.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[var(--color-text-secondary)] font-mono">Set Password *</label>
              <input 
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              <span>Create Admin User Account</span>
            </button>
          </form>
        </div>

        {/* Currently Logged In Admin Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Your Active Session</h2>
            <div className="p-4 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)] font-mono font-bold flex items-center justify-center">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-[var(--color-text-primary)] text-sm">{user?.email}</div>
                  <div className="text-[10px] font-mono text-[var(--color-accent-mint)] font-semibold">Active Super Admin</div>
                </div>
              </div>
              <div className="text-[11px] font-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
                User ID: {user?.id}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)] text-xs text-[var(--color-brand)] space-y-2">
            <div className="font-bold font-mono uppercase">Production Security Protocol</div>
            <p className="leading-relaxed text-[11px]">
              All admin user accounts are authenticated via Supabase PKCE JWT sessions and PostgreSQL Row Level Security (RLS).
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
