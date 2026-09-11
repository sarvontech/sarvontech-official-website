import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Wrench, 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  Check, 
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    num: '01',
    category_id: 'custom-websites',
    title: 'Business Websites & Digital Presence',
    category_label: 'Custom Web Engineering',
    short_value: 'We build high-performance, mobile-responsive company websites that establish trust and turn visitors into qualified leads.',
    image: '/assets/images/projects/custom-website-real-time-data.webp',
    alt: 'Business Websites & Digital Presence',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('num', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    setError('');
    setSuccessMsg('');
    if (service) {
      setEditingService(service);
      setFormData({
        num: service.num || '01',
        category_id: service.category_id || '',
        title: service.title || '',
        category_label: service.category_label || '',
        short_value: service.short_value || '',
        image: service.image || '',
        alt: service.alt || '',
      });
    } else {
      setEditingService(null);
      setFormData({
        num: `0${services.length + 1}`,
        category_id: 'new-service',
        title: '',
        category_label: 'Core Solutions',
        short_value: '',
        image: '/assets/images/projects/custom-business-systems.webp',
        alt: 'Service Overview Image',
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
      const payload = { ...formData };
      
      if (editingService) {
        const { error: updateErr } = await supabase
          .from('services')
          .update(payload)
          .eq('id', editingService.id);

        if (updateErr) throw updateErr;
        setSuccessMsg('Service card updated!');
      } else {
        // Generate a unique category_id to prevent constraint errors
        payload.category_id = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substr(2, 5);
        
        const { error: insertErr } = await supabase
          .from('services')
          .insert([payload]);

        if (insertErr) throw insertErr;
        setSuccessMsg('New service card added!');
      }

      fetchServices();
      setTimeout(() => setModalOpen(false), 800);
    } catch (err) {
      setError(err.message || 'Failed to save service.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service category card?')) return;
    try {
      const { error: delErr } = await supabase.from('services').delete().eq('id', id);
      if (delErr) throw delErr;
      fetchServices();
    } catch (err) {
      alert('Error deleting service: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>SERVICES CATEGORIES MANAGER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Manage Services Overview</h1>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service Card</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand)]" />
          <span>Loading services from database...</span>
        </div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] font-mono text-xs">
          No services entries found. Click "Add Service Card" above to add your first service overview card.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.id} className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 flex flex-col justify-between shadow-md hover:border-[var(--color-brand)] transition-all">
              <div className="space-y-3">
                <div className="h-32 rounded-xl bg-[var(--color-bg-primary)] overflow-hidden border border-[var(--color-border)] relative">
                  <img src={s.image} alt={s.alt} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-brand)] font-bold shadow-sm">
                    {s.num}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase font-semibold">
                    {s.num} &bull; {(s.category_label || '').replace(/^\d+\s*\?\?\s*/, '')}
                  </span>
                  <h3 className="font-bold text-[var(--color-text-primary)] text-base leading-tight mt-0.5">{s.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 mt-1.5 leading-relaxed">{s.short_value}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end gap-2">
                <button 
                  onClick={() => handleOpenModal(s)}
                  className="p-2 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(s.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer border border-red-500/20"
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
                {editingService ? 'Edit Service Card' : 'Create New Service Card'}
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
                <label className="text-[var(--color-text-secondary)] font-mono">Category Label *</label>
                <input 
                  type="text"
                  required
                  value={formData.category_label}
                  onChange={(e) => setFormData({ ...formData, category_label: e.target.value })}
                  placeholder="DIGITAL PRESENCE"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Service Title *</label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Business Websites & Digital Presence"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">1-Sentence Value Statement *</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.short_value}
                  onChange={(e) => setFormData({ ...formData, short_value: e.target.value })}
                  placeholder="We build high-performance, mobile-responsive company websites that establish trust..."
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
                  <span>{editingService ? 'Save Changes' : 'Create Card'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
