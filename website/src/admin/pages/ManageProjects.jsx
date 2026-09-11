import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  ExternalLink, 
  X, 
  Check, 
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Custom Software Systems',
    industry: 'Enterprise Software',
    summary: '',
    live_url: '',
    image: '',
    challenge: '',
    approach: '',
    solution: '',
    features: [],
    is_featured: true,
    is_real_project: true,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    setError('');
    setSuccessMsg('');
    setImageFile(null);
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name || '',
        slug: project.slug || '',
        category: project.category || 'Custom Software Systems',
        industry: project.industry || 'Enterprise Software',
        summary: project.summary || '',
        live_url: project.live_url || '',
        image: project.image || '',
        challenge: project.challenge || '',
        approach: project.approach || '',
        solution: project.solution || '',
        features: project.features || [],
        is_featured: project.is_featured ?? true,
        is_real_project: project.is_real_project ?? true,
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        slug: '',
        category: '',
        industry: 'Enterprise Software',
        summary: '',
        live_url: '',
        image: '',
        challenge: '',
        approach: '',
        solution: '',
        features: [],
        is_featured: true,
        is_real_project: true,
      });
    }
    setModalOpen(true);
  };

  const handleImageUpload = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMsg('');

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const cleanedFeatures = (formData.features || []).map(f => f.trim()).filter(f => f.length > 0);

      const payload = {
        ...formData,
        features: cleanedFeatures,
        image: imageUrl || '/assets/images/projects/custom-business-systems.webp',
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (editingProject) {
        const { error: updateErr } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.id);

        if (updateErr) throw updateErr;
        setSuccessMsg('Project updated successfully!');
      } else {
        const { error: insertErr } = await supabase
          .from('projects')
          .insert([payload]);

        if (insertErr) throw insertErr;
        setSuccessMsg('New project created successfully!');
      }

      fetchProjects();
      setTimeout(() => setModalOpen(false), 800);
    } catch (err) {
      setError(err.message || 'Failed to save project.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const { error: delErr } = await supabase.from('projects').delete().eq('id', id);
      if (delErr) throw delErr;
      fetchProjects();
    } catch (err) {
      alert('Error deleting project: ' + err.message);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <FolderKanban className="w-4 h-4" />
            <span>PORTFOLIO CONTENT MANAGER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Manage Projects</h1>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-3.5" />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by project name or category..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-brand)]"
        />
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand)]" />
          <span>Loading projects from database...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] font-mono text-xs">
          No projects found. Click "Add New Project" above to create your first portfolio entry.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div key={p.id} className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-md flex flex-col justify-between hover:border-[var(--color-brand)] transition-all">
              <div className="space-y-3">
                <div className="h-40 rounded-xl bg-[var(--color-bg-primary)] overflow-hidden border border-[var(--color-border)] relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-brand)] font-semibold shadow-sm">
                    {p.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] text-base">{p.name}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mt-1 leading-relaxed">{p.summary}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                {p.live_url ? (
                  <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[var(--color-brand)] hover:underline flex items-center gap-1 font-mono font-semibold">
                    <span>Live Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono">No Live URL</span>
                )}

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenModal(p)}
                    className="p-2 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer border border-red-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                {editingProject ? 'Edit Project' : 'Create New Project'}
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
                  <label className="text-[var(--color-text-secondary)] font-mono">Project Name *</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Revora Cinematic"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Category *</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a Category</option>
                    <option value="Websites">Websites</option>
                    <option value="Custom Digital Solution">Custom Digital Solution</option>
                    <option value="Spiritual & Community">Spiritual & Community</option>
                    <option value="Education">Education</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Business Systems">Business Systems</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Summary *</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Short 1-2 sentence description of the project..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Live Project URL (Optional)</label>
                <input 
                  type="url"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://www.revoracinematic.com/"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">The Challenge (Optional)</label>
                <textarea 
                  rows={2}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="What was the problem?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Our Approach (Optional)</label>
                <textarea 
                  rows={2}
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  placeholder="How did we solve it?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">The Solution Built (Optional)</label>
                <textarea 
                  rows={2}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Describe the final solution."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Key Features (Optional, one per line)</label>
                <textarea 
                  rows={3}
                  value={formData.features ? formData.features.join('\n') : ''}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n') })}
                  placeholder="Feature 1\nFeature 2\nFeature 3"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Project Image Upload</label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
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
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
