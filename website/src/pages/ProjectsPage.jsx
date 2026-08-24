import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { PROJECTS_DATA } from '../data/servonData';
import { ArrowRight, FolderKanban, Sparkles, ExternalLink } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

export default function ProjectsPage({ onOpenConsultation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(PROJECTS_DATA.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="Selected Work — Genuine Sarvon Tech Projects" 
        description="Explore real digital solutions, software platforms, and systems engineered by Sarvon Tech."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-brand)] font-semibold">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>PROOF & CAPABILITY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Selected Work & Systems Built
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Real digital platforms and custom software solutions designed and engineered by Sarvon Tech.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-md'
                  : 'glass-panel text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <RevealOnScroll className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((p) => (
            <div 
              key={p.slug}
              className="glass-card rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-[var(--color-surface)] aspect-video">
                  <img 
                    src={p.image} 
                    srcSet={p.imageLarge ? `${p.image} 800w, ${p.imageLarge} 1200w` : undefined}
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 600px"
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-primary)] bg-[var(--color-surface-glass)] backdrop-blur-md px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
                      {p.industry}
                    </span>
                    {p.isDemo && (
                      <span className="text-xs font-mono text-amber-700 dark:text-amber-300 bg-amber-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/40 flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>CONCEPT / DEMO</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--color-brand)] font-semibold">{p.category}</span>
                    {p.liveUrl && (
                      <a 
                        href={p.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-[var(--color-brand)] hover:underline inline-flex items-center gap-1 font-bold"
                      >
                        <span>revoracinematic.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                    {p.name}
                  </h2>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0 flex gap-3">
                <Link 
                  to={`/projects/${p.slug}`}
                  className="flex-1 py-3.5 rounded-xl bg-[var(--color-surface-hover)] hover:bg-[var(--color-brand)] text-[var(--color-text-primary)] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 group/btn border border-[var(--color-border)] hover:border-[var(--color-brand)] cursor-pointer"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                {p.liveUrl && (
                  <a 
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3.5 rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer flex-shrink-0"
                    title="Visit Live Site"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </RevealOnScroll>

      </div>
    </div>
  );
}
