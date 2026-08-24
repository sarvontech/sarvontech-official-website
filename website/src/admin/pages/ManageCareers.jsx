import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  Check, 
  Loader2,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function ManageCareers() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    role_key: '',
    department: 'Engineering',
    location: 'Hybrid / Remote (Pune / India)',
    employment_type: 'Full-time',
    experience: '1-3 years',
    summary: '',
    what_youll_build: '',
    is_active: true,
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('careers_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoles(data || []);
    } catch (err) {
      console.error('Error fetching career roles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (role = null) => {
    setError('');
    setSuccessMsg('');
    if (role) {
      setEditingRole(role);
      setFormData({
        title: role.title || '',
        role_key: role.role_key || '',
        department: role.department || 'Engineering',
        location: role.location || 'Hybrid / Remote (Pune / India)',
        employment_type: role.employment_type || 'Full-time',
        experience: role.experience || '1-3 years',
        summary: role.summary || '',
        what_youll_build: role.what_youll_build || '',
        is_active: role.is_active ?? true,
      });
    } else {
      setEditingRole(null);
      setFormData({
        title: '',
        role_key: '',
        department: 'Engineering',
        location: 'Hybrid / Remote (Pune / India)',
        employment_type: 'Full-time',
        experience: '1-3 years',
        summary: '',
        what_youll_build: '',
        is_active: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMsg('');

    try {
      const payload = {
        ...formData,
        role_key: formData.role_key || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (editingRole) {
        const { error: updateErr } = await supabase
          .from('careers_roles')
          .update(payload)
          .eq('id', editingRole.id);

        if (updateErr) throw updateErr;
        setSuccessMsg('Job role updated!');
      } else {
        const { error: insertErr } = await supabase
          .from('careers_roles')
          .insert([payload]);

        if (insertErr) throw insertErr;
        setSuccessMsg('New job opening posted!');
      }

      fetchRoles();
      setTimeout(() => setModalOpen(false), 800);
    } catch (err) {
      setError(err.message || 'Failed to save job role.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (role) => {
    try {
      const { error } = await supabase
        .from('careers_roles')
        .update({ is_active: !role.is_active })
        .eq('id', role.id);

      if (error) throw error;
      fetchRoles();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this career role posting?')) return;
    try {
      const { error } = await supabase.from('careers_roles').delete().eq('id', id);
      if (error) throw error;
      fetchRoles();
    } catch (err) {
      alert('Error deleting role: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>CAREERS & HIRING MANAGER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Manage Open Positions</h1>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job Opening</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand)]" />
          <span>Loading job roles from database...</span>
        </div>
      ) : roles.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] font-mono text-xs">
          No job roles posted yet. Click "Post New Job Opening" above to create your first open role.
        </div>
      ) : (
        <div className="space-y-4">
          {roles.map((r) => (
            <div 
              key={r.id}
              className={`p-6 rounded-2xl bg-[var(--color-surface)] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md ${
                r.is_active ? 'border-[var(--color-border)]' : 'border-[var(--color-border)] opacity-60'
              }`}
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{r.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                    r.is_active 
                      ? 'bg-[var(--color-brand-light)] border-[var(--color-border)] text-[var(--color-brand)]' 
                      : 'bg-[var(--color-bg-primary)] border-[var(--color-border)] text-[var(--color-text-muted)]'
                  }`}>
                    {r.is_active ? 'OPEN & ACCEPTING' : 'CLOSED / HIDDEN'}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-2 py-0.5 rounded border border-[var(--color-border)]">
                    {r.location}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{r.summary}</p>
              </div>

              <div className="flex items-center gap-3 pt-2 md:pt-0">
                <button
                  onClick={() => toggleStatus(r)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-[var(--color-border)]"
                >
                  {r.is_active ? <ToggleRight className="w-4 h-4 text-[var(--color-accent-mint)]" /> : <ToggleLeft className="w-4 h-4 text-[var(--color-text-muted)]" />}
                  <span>{r.is_active ? 'Active' : 'Paused'}</span>
                </button>

                <button 
                  onClick={() => handleOpenModal(r)}
                  className="p-2 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                <button 
                  onClick={() => handleDelete(r.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                {editingRole ? 'Edit Job Role' : 'Post New Job Role'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                <X className="w-5 h-5" />
              </button>
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

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Job Title *</label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="React Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Department *</label>
                  <input 
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Engineering"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Location *</label>
                  <input 
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Hybrid / Remote (Pune / India)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Summary *</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Short role overview..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[var(--color-border)]">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] font-semibold border border-[var(--color-border)]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingRole ? 'Save Changes' : 'Post Opening'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
