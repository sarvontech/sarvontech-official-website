import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLivePageContent, savePageContent, uploadMediaAsset } from '../../lib/supabase';
import { 
  ArrowLeft, 
  Save, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Edit3, 
  Loader2, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  Video,
  X,
  Upload,
  Sparkles,
  CheckCircle,
  Plus,
  Trash2,
  Heading,
  Bold,
  Italic,
  Link as LinkIcon
} from 'lucide-react';

// Import Public Website Pages
import HomePage from '../../pages/HomePage';
import SolutionsPage from '../../pages/SolutionsPage';
import ServicesPage from '../../pages/ServicesPage';
import ProductsPage from '../../pages/ProductsPage';
import IndustriesPage from '../../pages/IndustriesPage';
import ProjectsPage from '../../pages/ProjectsPage';
import CareersPage from '../../pages/CareersPage';
import AboutPage from '../../pages/AboutPage';
import ContactPage from '../../pages/ContactPage';

export default function VisualPageBuilder() {
  const { pageSlug = 'home' } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState('edit'); // 'edit' | 'preview'
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeMediaTarget, setActiveMediaTarget] = useState(null);

  // Dynamic Editable Page Elements
  const [elements, setElements] = useState({
    hero_badge: 'Digital Solutions & Software Partner',
    hero_headline: 'Digital Solutions That Help Your Business Grow',
    hero_subtext: 'From websites and custom software to CRM, automation and AI, we build practical digital solutions around the way your business works.',
    hero_cta_primary: 'Tell Us What You Need',
    hero_cta_secondary: 'Explore Solutions',
    hero_image: '/assets/images/hero-preview.png',
    hero_video: '',
    about_title: 'Who We Are & What We Stand For',
    about_text: 'Sarvon Tech is a technology company engineered to solve practical business problems.',
    cta_headline: 'Ready to upgrade your digital presence & workflows?',
    cta_button: 'Schedule Free Consultation',
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadPageContent();
  }, [pageSlug]);

  const loadPageContent = async () => {
    setLoading(true);
    try {
      const data = await getLivePageContent(pageSlug);
      if (data && data.sections && data.sections.elements) {
        setElements(prev => ({
          ...prev,
          ...data.sections.elements,
        }));
      }
    } catch (err) {
      console.warn('Using default builder state for', pageSlug);
    } finally {
      setLoading(false);
    }
  };

  const handleInlineBlur = (key, e) => {
    const textContent = e.target.innerText;
    setElements(prev => ({
      ...prev,
      [key]: textContent
    }));
  };

  const handleTriggerImageUpload = (key) => {
    setActiveMediaTarget(key);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeMediaTarget) return;

    setSaving(true);
    try {
      const publicUrl = await uploadMediaAsset(file);
      setElements(prev => ({
        ...prev,
        [activeMediaTarget]: publicUrl
      }));
      setSuccessMsg('Image uploaded and applied directly to page!');
    } catch (err) {
      setError('Image upload failed: ' + err.message);
    } finally {
      setSaving(false);
      setActiveMediaTarget(null);
    }
  };

  const handleSaveAndPublish = async () => {
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      await savePageContent(pageSlug, {
        title: pageSlug.toUpperCase() + ' Page',
        sections: { elements }
      });
      setSuccessMsg(`Page changes published live to website!`);
    } catch (err) {
      setError(err.message || 'Failed to save page changes.');
    } finally {
      setSaving(false);
    }
  };

  // Render Component Wrapper for Canvas
  const renderPageComponent = () => {
    const dummyProps = { onOpenConsultation: () => {} };
    switch (pageSlug) {
      case 'home':
        return <HomePage {...dummyProps} />;
      case 'solutions':
        return <SolutionsPage {...dummyProps} />;
      case 'services':
        return <ServicesPage {...dummyProps} />;
      case 'products':
        return <ProductsPage {...dummyProps} />;
      case 'industries':
        return <IndustriesPage {...dummyProps} />;
      case 'projects':
        return <ProjectsPage {...dummyProps} />;
      case 'careers':
        return <CareersPage {...dummyProps} />;
      case 'about':
        return <AboutPage {...dummyProps} />;
      case 'contact':
        return <ContactPage {...dummyProps} />;
      default:
        return <HomePage {...dummyProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col overflow-hidden">
      
      {/* Hidden File Input for Direct On-Page Image Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleFileUpload} 
        className="hidden" 
      />

      {/* 1. TOP FLOATING CONTROL HEADER */}
      <header className="h-16 bg-[#111827] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-50 flex-shrink-0 shadow-xl">
        
        {/* Left: Exit & Page Indicator */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/pages')}
            className="p-2 rounded-xl bg-[#1F2937] hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Exit Editor"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-extrabold text-sm text-white tracking-tight">Direct Visual Page Editor</span>
            <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded border border-teal-500/20">
              /{pageSlug}
            </span>
          </div>
        </div>

        {/* Center: Viewport & Mode Switchers */}
        <div className="flex items-center gap-4">
          
          {/* Viewport Switcher */}
          <div className="p-1 rounded-xl bg-[#1F2937] border border-slate-700 flex items-center gap-1">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                viewport === 'desktop' ? 'bg-teal-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                viewport === 'tablet' ? 'bg-teal-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                viewport === 'mobile' ? 'bg-teal-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="p-1 rounded-xl bg-[#1F2937] border border-slate-700 flex items-center gap-1">
            <button
              onClick={() => setMode('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'edit' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Direct Edit Mode</span>
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'preview' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

        </div>

        {/* Right: Save & Publish Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAndPublish}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Publish Page Live</span>
          </button>
        </div>

      </header>

      {/* Alert Banners */}
      {error && (
        <div className="bg-red-500/10 border-b border-red-500/30 px-6 py-2 text-red-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-6 py-2 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* 2. FULL-WIDTH DIRECT INLINE PAGE CANVAS */}
      <main className="flex-1 bg-[#05080E] overflow-y-auto flex justify-center p-4 sm:p-8 relative">
        
        {/* EDIT MODE FLOATING HINT */}
        {mode === 'edit' && (
          <div className="fixed top-20 right-8 z-50 bg-teal-600 text-white text-xs font-mono font-bold px-4 py-2 rounded-2xl shadow-2xl border border-teal-400 flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>Click any text directly on screen to edit & type!</span>
          </div>
        )}

        <div 
          className={`
            bg-[var(--color-bg-primary)] transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden relative border border-slate-800
            ${viewport === 'desktop' ? 'w-full max-w-7xl' : ''}
            ${viewport === 'tablet' ? 'w-[768px]' : ''}
            ${viewport === 'mobile' ? 'w-[375px]' : ''}
          `}
        >
          {loading ? (
            <div className="p-20 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
              <span>Loading live website canvas...</span>
            </div>
          ) : (
            <div className="relative">
              
              {/* DIRECT INLINE EDITING OVERLAY CONTROLS */}
              {mode === 'edit' ? (
                <div className="direct-page-editor-container relative">
                  
                  {/* HERO SECTION WITH DIRECT INLINE EDITING */}
                  <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[var(--color-bg-primary)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        <div className="lg:col-span-7 space-y-6 text-left">
                          
                          {/* BADGE TAG (CLICK TO EDIT) */}
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] border border-teal-500/40 text-xs font-semibold text-[var(--color-brand)] relative group hover:ring-2 hover:ring-teal-500">
                            <span className="text-[10px] font-mono uppercase bg-teal-500 text-white px-1.5 py-0.5 rounded absolute -top-3 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to edit badge
                            </span>
                            <span 
                              contentEditable 
                              suppressContentEditableWarning 
                              onBlur={(e) => handleInlineBlur('hero_badge', e)}
                              className="outline-none focus:bg-teal-500/10 rounded px-1"
                            >
                              {elements.hero_badge}
                            </span>
                          </div>

                          {/* MAIN H1 HEADLINE (CLICK TO EDIT DIRECTLY) */}
                          <div className="relative group hover:ring-2 hover:ring-teal-500 rounded-xl p-2 transition-all">
                            <span className="text-[10px] font-mono uppercase bg-teal-600 text-white px-2 py-0.5 rounded absolute -top-3 left-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                              Main H1 Headline (Click to type)
                            </span>
                            <h1 
                              contentEditable 
                              suppressContentEditableWarning 
                              onBlur={(e) => handleInlineBlur('hero_headline', e)}
                              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.15] outline-none focus:bg-teal-500/10 rounded-lg p-1"
                            >
                              {elements.hero_headline}
                            </h1>
                          </div>

                          {/* SUBTITLE / PARAGRAPH (CLICK TO EDIT DIRECTLY) */}
                          <div className="relative group hover:ring-2 hover:ring-teal-500 rounded-xl p-2 transition-all">
                            <span className="text-[10px] font-mono uppercase bg-teal-600 text-white px-2 py-0.5 rounded absolute -top-3 left-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                              Subtitle Copy (Click to type)
                            </span>
                            <p 
                              contentEditable 
                              suppressContentEditableWarning 
                              onBlur={(e) => handleInlineBlur('hero_subtext', e)}
                              className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed outline-none focus:bg-teal-500/10 rounded-lg p-1"
                            >
                              {elements.hero_subtext}
                            </p>
                          </div>

                          {/* BUTTON LABELS (CLICK TO EDIT DIRECTLY) */}
                          <div className="flex flex-wrap items-center gap-4 pt-2">
                            <div className="relative group hover:ring-2 hover:ring-teal-500 rounded-xl p-1">
                              <span className="text-[9px] font-mono uppercase bg-teal-600 text-white px-1.5 py-0.5 rounded absolute -top-3 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Primary Button
                              </span>
                              <button className="px-7 py-4 rounded-xl bg-[var(--color-brand)] text-white font-bold text-base shadow-md inline-flex items-center gap-2">
                                <span 
                                  contentEditable 
                                  suppressContentEditableWarning 
                                  onBlur={(e) => handleInlineBlur('hero_cta_primary', e)}
                                  className="outline-none"
                                >
                                  {elements.hero_cta_primary}
                                </span>
                              </button>
                            </div>

                            <div className="relative group hover:ring-2 hover:ring-teal-500 rounded-xl p-1">
                              <span className="text-[9px] font-mono uppercase bg-teal-600 text-white px-1.5 py-0.5 rounded absolute -top-3 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Secondary Button
                              </span>
                              <button className="px-6 py-4 rounded-xl glass-panel text-[var(--color-text-primary)] font-semibold text-base border border-[var(--color-border)] inline-flex items-center gap-2">
                                <span 
                                  contentEditable 
                                  suppressContentEditableWarning 
                                  onBlur={(e) => handleInlineBlur('hero_cta_secondary', e)}
                                  className="outline-none"
                                >
                                  {elements.hero_cta_secondary}
                                </span>
                              </button>
                            </div>
                          </div>

                        </div>

                        {/* RIGHT HERO IMAGE / VIDEO WITH DIRECT OVERLAY BUTTONS */}
                        <div className="lg:col-span-5 relative group">
                          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#111827]">
                            
                            {/* Hover Overlay Button to Replace Image directly */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <button
                                onClick={() => handleTriggerImageUpload('hero_image')}
                                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-xl flex items-center gap-2 cursor-pointer"
                              >
                                <Upload className="w-4 h-4" />
                                <span>Change Image Directly</span>
                              </button>
                            </div>

                            <img 
                              src={elements.hero_image || '/assets/images/projects/custom-business-systems.webp'} 
                              alt="Hero Preview" 
                              className="w-full h-auto object-cover" 
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </section>

                  {/* REST OF PAGE PREVIEW */}
                  {renderPageComponent()}

                </div>
              ) : (
                /* LIVE PREVIEW MODE */
                renderPageComponent()
              )}

            </div>
          )}
        </div>

      </main>

    </div>
  );
}
