import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getLivePageContent, savePageContent, uploadMediaAsset } from '../../lib/supabase';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Check, 
  AlertCircle, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  FileUp, 
  Plus, 
  Trash2, 
  Globe, 
  Sparkles,
  Layers,
  Search
} from 'lucide-react';

export default function EditPageContent() {
  const { pageSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTitle = searchParams.get('title') || pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1) + ' Page';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [pageData, setPageData] = useState({
    title: initialTitle,
    hero_title: '',
    hero_subtitle: '',
    hero_image: '',
    hero_video: '',
    sections: {
      about_title: '',
      about_desc: '',
      cta_headline: '',
      cta_button_text: '',
    },
    custom_blocks: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    }
  });

  const [uploadingMedia, setUploadingMedia] = useState(false);

  useEffect(() => {
    loadPageData();
  }, [pageSlug]);

  const loadPageData = async () => {
    setLoading(true);
    try {
      const data = await getLivePageContent(pageSlug);
      if (data) {
        setPageData({
          title: data.title || initialTitle,
          hero_title: data.hero_title || '',
          hero_subtitle: data.hero_subtitle || '',
          hero_image: data.hero_image || '',
          hero_video: data.hero_video || '',
          sections: data.sections || { about_title: '', about_desc: '', cta_headline: '', cta_button_text: '' },
          custom_blocks: data.sections?.custom_blocks || [],
          seo: data.seo || { metaTitle: '', metaDescription: '', keywords: '' },
        });
      }
    } catch (err) {
      console.warn('Could not fetch page record, initializing clean editor:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, targetField) => {
    setUploadingMedia(true);
    setError('');
    try {
      const publicUrl = await uploadMediaAsset(file);
      if (targetField === 'hero_image') {
        setPageData(prev => ({ ...prev, hero_image: publicUrl }));
      } else if (targetField === 'hero_video') {
        setPageData(prev => ({ ...prev, hero_video: publicUrl }));
      }
      setSuccessMsg('Media uploaded and attached to page!');
    } catch (err) {
      setError('Media upload failed: ' + err.message);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleAddCustomBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type, // 'text' | 'image' | 'video' | 'pdf'
      title: type === 'pdf' ? 'Download PDF Report' : type === 'video' ? 'Product Walkthrough Video' : 'Section Title',
      content: type === 'text' ? 'Enter your custom paragraph content here...' : '',
      mediaUrl: '',
    };
    setPageData(prev => ({
      ...prev,
      custom_blocks: [...prev.custom_blocks, newBlock]
    }));
  };

  const handleRemoveCustomBlock = (id) => {
    setPageData(prev => ({
      ...prev,
      custom_blocks: prev.custom_blocks.filter(b => b.id !== id)
    }));
  };

  const handleUpdateCustomBlock = (id, key, val) => {
    setPageData(prev => ({
      ...prev,
      custom_blocks: prev.custom_blocks.map(b => b.id === id ? { ...b, [key]: val } : b)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      await savePageContent(pageSlug, {
        ...pageData,
        sections: {
          ...pageData.sections,
          custom_blocks: pageData.custom_blocks,
        }
      });
      setSuccessMsg(`Page content for "${pageData.title}" published live to website!`);
    } catch (err) {
      setError(err.message || 'Failed to publish page content.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto">
      
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin/pages')}
            className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>EDITING INNER PAGE: /{pageSlug}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              {pageData.title}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Publish Page Changes</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="p-16 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[var(--color-brand)]" />
          <span>Loading page editor configuration...</span>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-[var(--color-border)] gap-2 overflow-x-auto pb-1">
            {[
              { id: 'hero', label: 'Hero & Header', icon: Sparkles },
              { id: 'sections', label: 'Page Content & Text', icon: FileText },
              { id: 'media', label: 'Images, Videos & PDFs', icon: ImageIcon },
              { id: 'custom', label: 'Custom Content Blocks', icon: Layers },
              { id: 'seo', label: 'SEO & Search Meta', icon: Search },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'bg-[var(--color-brand-light)] text-[var(--color-brand)] border border-[var(--color-border)] shadow-sm font-bold' 
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: HERO & HEADER */}
          {activeTab === 'hero' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-5 shadow-md">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--color-brand)]" />
                <span>Hero Section & Main Header</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Page Display Title *</label>
                  <input 
                    type="text"
                    value={pageData.title}
                    onChange={e => setPageData({ ...pageData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Hero Main Headline</label>
                  <input 
                    type="text"
                    value={pageData.hero_title}
                    onChange={e => setPageData({ ...pageData, hero_title: e.target.value })}
                    placeholder="Engineering High-Impact Custom Software Systems"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Hero Subtitle / Tagline</label>
                  <textarea 
                    rows={3}
                    value={pageData.hero_subtitle}
                    onChange={e => setPageData({ ...pageData, hero_subtitle: e.target.value })}
                    placeholder="We turn complex business operations into fast, intuitive web applications..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAGE CONTENT & TEXT SECTIONS */}
          {activeTab === 'sections' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-5 shadow-md">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-brand)]" />
                <span>Core Section Content & Paragraphs</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Overview Section Title</label>
                  <input 
                    type="text"
                    value={pageData.sections.about_title || ''}
                    onChange={e => setPageData({ ...pageData, sections: { ...pageData.sections, about_title: e.target.value } })}
                    placeholder="Why Choose ServonTech Solutions"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Overview Description Paragraph</label>
                  <textarea 
                    rows={4}
                    value={pageData.sections.about_desc || ''}
                    onChange={e => setPageData({ ...pageData, sections: { ...pageData.sections, about_desc: e.target.value } })}
                    placeholder="Detailed section narrative describing your value proposition..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[var(--color-text-secondary)] font-mono">Bottom CTA Headline</label>
                    <input 
                      type="text"
                      value={pageData.sections.cta_headline || ''}
                      onChange={e => setPageData({ ...pageData, sections: { ...pageData.sections, cta_headline: e.target.value } })}
                      placeholder="Ready To Transform Your Operations?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[var(--color-text-secondary)] font-mono">Bottom CTA Button Label</label>
                    <input 
                      type="text"
                      value={pageData.sections.cta_button_text || ''}
                      onChange={e => setPageData({ ...pageData, sections: { ...pageData.sections, cta_button_text: e.target.value } })}
                      placeholder="Schedule Free Consultation"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA, VIDEOS & PDF ATTACHMENTS */}
          {activeTab === 'media' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-5 shadow-md">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[var(--color-brand)]" />
                <span>Page Images, Video Embeds & PDF Downloads</span>
              </h2>

              <div className="space-y-6 text-xs">
                {/* Hero Image Upload */}
                <div className="p-4 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] space-y-3">
                  <div className="font-bold text-[var(--color-text-primary)] font-mono flex items-center gap-2">
                    <FileUp className="w-4 h-4 text-[var(--color-brand)]" />
                    <span>Page Hero Header Image</span>
                  </div>

                  {pageData.hero_image && (
                    <div className="h-32 rounded-xl overflow-hidden border border-[var(--color-border)] relative max-w-sm">
                      <img src={pageData.hero_image} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <input 
                    type="file"
                    accept="image/*"
                    onChange={e => e.target.files[0] && handleFileUpload(e.target.files[0], 'hero_image')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                {/* Hero Video Link */}
                <div className="p-4 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] space-y-3">
                  <div className="font-bold text-[var(--color-text-primary)] font-mono flex items-center gap-2">
                    <Video className="w-4 h-4 text-[var(--color-accent-mint)]" />
                    <span>Hero Video Link / Embed URL</span>
                  </div>
                  <input 
                    type="url"
                    value={pageData.hero_video}
                    onChange={e => setPageData({ ...pageData, hero_video: e.target.value })}
                    placeholder="https://www.youtube.com/embed/... or MP4 video URL"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOM CONTENT BLOCKS */}
          {activeTab === 'custom' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-5 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[var(--color-brand)]" />
                    <span>Dynamic Custom Content Blocks</span>
                  </h2>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    Add custom text, image galleries, video showcases, or PDF download blocks to this page.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddCustomBlock('text')}
                    className="px-3 py-1.5 rounded-xl bg-[var(--color-bg-primary)] hover:bg-[var(--color-brand-light)] text-[var(--color-text-primary)] text-xs font-semibold border border-[var(--color-border)] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Text Block</span>
                  </button>
                  <button
                    onClick={() => handleAddCustomBlock('pdf')}
                    className="px-3 py-1.5 rounded-xl bg-[var(--color-bg-primary)] hover:bg-[var(--color-brand-light)] text-[var(--color-text-primary)] text-xs font-semibold border border-[var(--color-border)] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>PDF Download</span>
                  </button>
                </div>
              </div>

              {pageData.custom_blocks.length === 0 ? (
                <div className="p-8 text-center text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] rounded-2xl border border-[var(--color-border)] font-mono">
                  No custom content blocks added yet. Click "Text Block" or "PDF Download" above to add new section blocks.
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  {pageData.custom_blocks.map((block, idx) => (
                    <div key={block.id} className="p-4 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-brand)]">
                          Block #{idx + 1} ({block.type.toUpperCase()})
                        </span>
                        <button
                          onClick={() => handleRemoveCustomBlock(block.id)}
                          className="p-1 text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <input 
                        type="text"
                        value={block.title}
                        onChange={e => handleUpdateCustomBlock(block.id, 'title', e.target.value)}
                        placeholder="Block Title / Headline"
                        className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                      />

                      <textarea 
                        rows={3}
                        value={block.content}
                        onChange={e => handleUpdateCustomBlock(block.id, 'content', e.target.value)}
                        placeholder="Block text content / description..."
                        className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                      />

                      <input 
                        type="url"
                        value={block.mediaUrl || ''}
                        onChange={e => handleUpdateCustomBlock(block.id, 'mediaUrl', e.target.value)}
                        placeholder="Attachment URL (Image, Video, or PDF link)"
                        className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SEO & SEARCH META */}
          {activeTab === 'seo' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-5 shadow-md">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Search className="w-5 h-5 text-[var(--color-brand)]" />
                <span>Search Engine Optimization (SEO)</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Meta Title Tag</label>
                  <input 
                    type="text"
                    value={pageData.seo.metaTitle || ''}
                    onChange={e => setPageData({ ...pageData, seo: { ...pageData.seo, metaTitle: e.target.value } })}
                    placeholder="ServonTech | Custom Business Software & AI Automation Solutions"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Meta Description</label>
                  <textarea 
                    rows={3}
                    value={pageData.seo.metaDescription || ''}
                    onChange={e => setPageData({ ...pageData, seo: { ...pageData.seo, metaDescription: e.target.value } })}
                    placeholder="ServonTech builds high-performance company websites, custom sales CRMs, and AI automation systems..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
