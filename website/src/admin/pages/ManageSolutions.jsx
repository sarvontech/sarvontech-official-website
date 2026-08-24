import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Lightbulb, 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  Check, 
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ManageSolutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    tagline: '',
    headline: '',
    desc: '',
    detailedProblem: '',
    whoItIsFor: '',
  });

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setSolutions(data || []);
    } catch (err) {
      console.error('Error fetching solutions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    setError('');
    setSuccessMsg('');
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        shortTitle: item.shortTitle || '',
        tagline: item.tagline || '',
        headline: item.headline || '',
        desc: item.desc || '',
        detailedProblem: item.detailedProblem || '',
        whoItIsFor: item.whoItIsFor || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        shortTitle: '',
        tagline: '',
        headline: '',
        desc: '',
        detailedProblem: '',
        whoItIsFor: '',
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
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (editingItem) {
        const { error: updateErr } = await supabase
          .from('solutions')
          .update(payload)
          .eq('id', editingItem.id);

        if (updateErr) throw updateErr;
        setSuccessMsg('Solution pillar updated!');
      } else {
        const { error: insertErr } = await supabase
          .from('solutions')
          .insert([payload]);

        if (insertErr) throw insertErr;
        setSuccessMsg('New solution pillar added!');
      }

      fetchSolutions();
      setTimeout(() => setModalOpen(false), 800);
    } catch (err) {
      setError(err.message || 'Failed to save solution.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this solution entry?')) return;
    try {
      const { error } = await supabase.from('solutions').delete().eq('id', id);
      if (error) throw error;
      fetchSolutions();
    } catch (err) {
      alert('Error deleting entry: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>SOLUTIONS & CAPABILITIES MANAGER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Manage Solutions Grid</h1>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Solution Pillar</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand)]" />
          <span>Loading solutions from database...</span>
        </div>
      ) : solutions.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] font-mono text-xs">
          No custom solutions entries in database yet. Click "Add Solution Pillar" above to populate live records.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 flex flex-col justify-between shadow-md hover:border-[var(--color-brand)] transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[var(--color-brand)] font-bold uppercase">{item.shortTitle}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] text-lg">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end gap-2">
                <button 
                  onClick={() => handleOpenModal(item)}
                  className="p-2 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
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
                {editingItem ? 'Edit Solution Pillar' : 'Add Solution Pillar'}
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Title *</label>
                  <input 
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Digital Presence & Websites"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Short Badge Title *</label>
                  <input 
                    type="text"
                    required
                    value={formData.shortTitle}
                    onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                    placeholder="DIGITAL PRESENCE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Headline *</label>
                <input 
                  type="text"
                  required
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="High-Converting Business Websites & Portals"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Description *</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Detailed description of what this solution solves..."
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
                  <span>{editingItem ? 'Save Changes' : 'Create Solution'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
