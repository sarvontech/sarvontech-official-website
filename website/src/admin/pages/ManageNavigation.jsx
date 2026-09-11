import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './components/SortableItem';
import { 
  Menu, 
  Plus, 
  Loader2, 
  AlertCircle, 
  Check, 
  X
} from 'lucide-react';

const PREDEFINED_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Industries', path: '/industries' },
  { name: 'Projects', path: '/projects' },
  { name: 'Careers', path: '/careers' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function ManageNavigation() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Flattened ordered list for DND and Rendering
  const [orderedLinks, setOrderedLinks] = useState([]);

  const [formData, setFormData] = useState({
    label: '',
    url: '',
    parent_id: '',
    open_in_new_tab: false,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchLinksAndPages();
  }, []);

  const [availablePages, setAvailablePages] = useState(PREDEFINED_PAGES);

  useEffect(() => {
    // Whenever links change, rebuild the ordered list for DND
    // We only sort top-level links right now for simplicity
    const topLevel = links.filter(l => !l.parent_id).sort((a, b) => a.order_index - b.order_index);
    setOrderedLinks(topLevel);
  }, [links]);

  const fetchLinksAndPages = async () => {
    setLoading(true);
    try {
      const { data: navData, error: navError } = await supabase
        .from('navigation_links')
        .select('*')
        .order('order_index', { ascending: true });

      if (navError) throw navError;
      setLinks(navData || []);

      const { data: pageData, error: pageError } = await supabase
        .from('page_contents')
        .select('slug, title');
      
      if (pageError) throw pageError;

      const dynamicPages = (pageData || []).map(p => ({
        name: p.title || p.slug,
        path: `/${p.slug}`
      })).filter(p => !PREDEFINED_PAGES.some(pre => pre.path === p.path));

      setAvailablePages([...PREDEFINED_PAGES, ...dynamicPages]);

    } catch (err) {
      console.error('Error fetching links/pages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = orderedLinks.findIndex((l) => l.id === active.id);
      const newIndex = orderedLinks.findIndex((l) => l.id === over.id);

      const newOrder = arrayMove(orderedLinks, oldIndex, newIndex);
      setOrderedLinks(newOrder);

      // Save to Supabase immediately in background
      try {
        const updates = newOrder.map((item, idx) => ({
          id: item.id,
          order_index: idx
        }));
        
        // Supabase bulk upsert requires full row, or multiple updates.
        for (const update of updates) {
          await supabase.from('navigation_links').update({ order_index: update.order_index }).eq('id', update.id);
        }
      } catch (e) {
        console.error("Failed to update order", e);
      }
    }
  };

  const handleOpenModal = (item = null) => {
    setError('');
    setSuccessMsg('');
    if (item) {
      setEditingItem(item);
      setFormData({
        label: item.label,
        url: item.url,
        parent_id: item.parent_id || '',
        open_in_new_tab: item.open_in_new_tab || false,
      });
    } else {
      setEditingItem(null);
      setFormData({
        label: '',
        url: '',
        parent_id: '',
        open_in_new_tab: false,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const payload = {
        label: formData.label,
        url: formData.url,
        parent_id: formData.parent_id || null,
        open_in_new_tab: formData.open_in_new_tab,
      };

      if (editingItem) {
        const { error: updateErr } = await supabase
          .from('navigation_links')
          .update(payload)
          .eq('id', editingItem.id);

        if (updateErr) throw updateErr;
        setSuccessMsg('Link updated successfully!');
      } else {
        // Find max order_index to append
        const topLevel = links.filter(l => !l.parent_id);
        payload.order_index = topLevel.length;
        
        const { error: insertErr } = await supabase
          .from('navigation_links')
          .insert([payload]);

        if (insertErr) throw insertErr;
        setSuccessMsg('New link added successfully!');
      }

      await fetchLinksAndPages();
      setTimeout(() => setModalOpen(false), 800);
    } catch (err) {
      setError(err.message || 'Failed to save link.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this link? If this is a parent, all child links will be deleted too.')) return;
    try {
      const { error } = await supabase.from('navigation_links').delete().eq('id', id);
      if (error) throw error;
      fetchLinksAndPages();
    } catch (err) {
      alert('Error deleting link: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <Menu className="w-4 h-4" />
            <span>NAVIGATION MANAGER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Manage Navbar Links</h1>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Link</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[var(--color-brand)]" />
          <span className="text-sm font-mono text-[var(--color-text-muted)]">Loading links...</span>
        </div>
      ) : (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm p-4">
          <p className="text-xs text-[var(--color-text-muted)] mb-4 px-2">Drag and drop top-level items to reorder them.</p>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={orderedLinks.map(l => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {orderedLinks.map(link => (
                  <SortableItem 
                    key={link.id} 
                    id={link.id} 
                    item={link} 
                    onEdit={() => handleOpenModal(link)}
                    onDelete={() => handleDelete(link.id)}
                    childrenLinks={links.filter(l => l.parent_id === link.id).sort((a,b) => a.order_index - b.order_index)}
                    onEditChild={(child) => handleOpenModal(child)}
                    onDeleteChild={(childId) => handleDelete(childId)}
                    allLinks={links}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-4">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                {editingItem ? 'Edit Link' : 'Add Link'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Label *</label>
                <input 
                  type="text" required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Services"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[var(--color-text-secondary)] font-mono">URL Path *</label>
                  <div className="flex gap-1 bg-[var(--color-surface-hover)] p-0.5 rounded-lg border border-[var(--color-border)]">
                      <button 
                      type="button" 
                      onClick={() => setFormData({ ...formData, url: '/' })} // Basic reset, let the user pick
                      className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                        availablePages.some(p => p.path === formData.url) || formData.url === ''
                          ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm' 
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      Inner Page
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({ ...formData, url: 'https://' })}
                      className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                        !availablePages.some(p => p.path === formData.url) && formData.url !== ''
                          ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm' 
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      Custom Link
                    </button>
                  </div>
                </div>

                {availablePages.some(p => p.path === formData.url) || formData.url === '' ? (
                  <select
                    required
                    value={formData.url}
                    onChange={(e) => {
                      const selected = availablePages.find(p => p.path === e.target.value);
                      setFormData({ 
                        ...formData, 
                        url: e.target.value, 
                        // Auto-fill label if it's currently empty
                        label: formData.label || (selected ? selected.name : '') 
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:border-[var(--color-brand)] outline-none"
                  >
                    <option value="" disabled>-- Select an inner page --</option>
                    {availablePages.map(page => (
                      <option key={page.path} value={page.path}>
                        {page.name} ({page.path})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type="text" required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="e.g. https://google.com or /custom-path"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:border-[var(--color-brand)] outline-none"
                  />
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Parent Menu (Optional)</label>
                <select
                  value={formData.parent_id}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                >
                  <option value="">-- No Parent (Top Level) --</option>
                  {links.filter(l => !l.parent_id).sort((a,b) => a.order_index - b.order_index).map(l => (
                    l.id !== editingItem?.id && (
                      <React.Fragment key={l.id}>
                        <option value={l.id}>{l.label}</option>
                        {links
                          .filter(child => child.parent_id === l.id)
                          .sort((a,b) => a.order_index - b.order_index)
                          .map(child => (
                            child.id !== editingItem?.id && (
                              <option key={child.id} value={child.id}>
                                &nbsp;&nbsp;&nbsp;└ {child.label}
                              </option>
                            )
                        ))}
                      </React.Fragment>
                    )
                  ))}
                </select>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">Select a parent if this should appear inside a dropdown.</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox"
                  id="open_in_new_tab"
                  checked={formData.open_in_new_tab}
                  onChange={(e) => setFormData({ ...formData, open_in_new_tab: e.target.checked })}
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-brand)] focus:ring-[var(--color-brand)] bg-[var(--color-bg-primary)]"
                />
                <label htmlFor="open_in_new_tab" className="text-xs text-[var(--color-text-secondary)]">
                  Open link in a new tab (useful for external links)
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[var(--color-border)]">
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-xl bg-[var(--color-brand)] text-white font-bold inline-flex items-center gap-2 cursor-pointer">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingItem ? 'Save Changes' : 'Create Link'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
