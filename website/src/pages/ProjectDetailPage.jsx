import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getLiveProjects } from '../lib/supabase';
import { ArrowRight, CheckCircle2, ChevronLeft, AlertCircle, Lightbulb, ShieldCheck, ExternalLink, Loader2 } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

export default function ProjectDetailPage({ onOpenConsultation }) {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const projects = await getLiveProjects();
        const found = projects.find((p) => p.slug === slug) || projects[0];
        setProject(found);
      } catch (err) {
        console.error("Failed to load project details", err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand)]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title={`${project.name} — Project Case Study`} 
        description={project.summary}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <Link 
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Hero */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
              {project.category}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold inline-flex items-center gap-1 hover:bg-emerald-500/20 transition-all"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            {project.name}
          </h1>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed">
            {project.summary}
          </p>

          {project.liveUrl && (
            <div className="pt-2">
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Launch Live Project ({project.liveUrl})</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Visual Banner Image */}
        <div className="rounded-3xl overflow-hidden border border-[var(--color-border)] max-h-[540px] relative bg-[var(--color-surface)] shadow-xl aspect-video">
          <img 
            src={project.imageLarge || project.image} 
            srcSet={project.imageLarge ? `${project.image} 800w, ${project.imageLarge} 1200w` : undefined}
            sizes="(max-width: 1024px) 95vw, 1100px"
            alt={project.name}
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Challenge, Approach & Solution Grid */}
        <RevealOnScroll className="grid md:grid-cols-3 gap-6 text-xs text-[var(--color-text-secondary)]">
          
          <div className="glass-card p-6 rounded-2xl border border-[var(--color-card-problem-border)] space-y-2 bg-[var(--color-card-problem-bg)]">
            <div className="font-bold text-[var(--color-card-problem-text)] text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>The Challenge</span>
            </div>
            <p className="leading-relaxed">{project.challenge || 'Details coming soon.'}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[var(--color-border)] space-y-2 bg-[var(--color-brand-light)]">
            <div className="font-bold text-[var(--color-brand)] text-sm flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Sarvon Tech Approach</span>
            </div>
            <p className="leading-relaxed">{project.approach || 'Details coming soon.'}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[var(--color-card-solution-border)] space-y-2 bg-[var(--color-card-solution-bg)]">
            <div className="font-bold text-[var(--color-card-solution-text)] text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>The Solution Built</span>
            </div>
            <p className="leading-relaxed">{project.solution || 'Details coming soon.'}</p>
          </div>

        </RevealOnScroll>

        {/* Key Features Delivered */}
        <RevealOnScroll className="glass-card rounded-3xl p-8 sm:p-10 border border-[var(--color-border)] space-y-6 shadow-xl">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Key System Capabilities Delivered</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-[var(--color-text-secondary)]">
            {(project.features || []).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-lime)] flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
            {(!project.features || project.features.length === 0) && (
              <div className="col-span-full p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] italic">
                Features will be updated soon.
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* Outcome */}
        <RevealOnScroll className="grid md:grid-cols-1 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-[var(--color-border)] space-y-2 shadow-sm">
            <div className="text-xs font-mono text-[var(--color-accent-mint)] uppercase font-semibold">Capability Delivered</div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{project.outcome || 'Success achieved.'}</p>
          </div>
        </RevealOnScroll>

        {/* Project Specific CTA */}
        <RevealOnScroll className="glass-panel p-8 rounded-3xl border border-[var(--color-border)] text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Have a Similar System Requirement?</h3>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Our engineering team will assess your business goals and architect a custom digital solution tailored around your operational workflow.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => onOpenConsultation(`Project Interest: ${project.name}`)}
              className="px-6 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-xs inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Discuss a Project Like This</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] font-semibold text-xs inline-flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
