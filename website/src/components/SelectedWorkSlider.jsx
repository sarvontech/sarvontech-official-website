import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getLiveProjects } from '../lib/supabase';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function SelectedWorkSlider() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePosition, setActivePosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const scrollRef = useRef(null);

  useEffect(() => {
    async function load() {
      const data = await getLiveProjects();
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const getVisibleItems = useCallback((width) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }, []);

  const totalItems = filteredProjects.length;
  const visibleItems = getVisibleItems(viewportWidth);
  const totalPositions = Math.max(1, totalItems - visibleItems + 1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setViewportWidth(w);
      const newVisible = getVisibleItems(w);
      const newTotalPos = Math.max(1, totalItems - newVisible + 1);
      setActivePosition((prev) => Math.min(prev, newTotalPos - 1));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalItems, getVisibleItems]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 340;
    const gap = 24;
    const index = Math.round(scrollRef.current.scrollLeft / (cardWidth + gap));
    const clamped = Math.min(Math.max(index, 0), totalPositions - 1);
    setActivePosition(clamped);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [totalPositions]);

  const scrollToPosition = (pos) => {
    if (!scrollRef.current) return;
    const targetPos = Math.min(Math.max(pos, 0), totalPositions - 1);
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 340;
    const gap = 24;
    scrollRef.current.scrollTo({ left: targetPos * (cardWidth + gap), behavior: 'smooth' });
    setActivePosition(targetPos);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isHovered || totalPositions <= 1) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const nextPos = (activePosition + 1) % totalPositions;
      scrollToPosition(nextPos);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, totalPositions, activePosition]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setActivePosition(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-[var(--color-bg-primary)] flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand)]" />
      </section>
    );
  }

  return (
    <section 
      id="projects" 
      className="py-20 bg-[var(--color-bg-primary)] relative overflow-hidden transition-colors duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              PROOF & CAPABILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Selected Work
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base max-w-xl">
              A look at the digital experiences and systems we've built.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToPosition(activePosition - 1)}
                disabled={activePosition === 0}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  activePosition > 0 
                    ? 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border-[var(--color-border)]' 
                    : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)] opacity-50 cursor-not-allowed'
                }`}
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToPosition(activePosition + 1)}
                disabled={activePosition >= totalPositions - 1}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  activePosition < totalPositions - 1 
                    ? 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border-[var(--color-border)]' 
                    : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)] opacity-50 cursor-not-allowed'
                }`}
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link 
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors group whitespace-nowrap"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-md'
                  : 'glass-panel text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Single-Line Project Carousel */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-6 pt-1 no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {filteredProjects.map((p) => (
              <div 
                key={p.slug || p.id}
                className="w-[85vw] sm:w-[340px] lg:w-[370px] xl:w-[380px] flex-shrink-0 snap-start glass-card rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all flex flex-col justify-between group/card"
              >
                <div>
                  {/* Visual Project Image Container with Reserved Aspect Ratio */}
                  <div className="relative h-52 w-full overflow-hidden bg-[var(--color-surface)] aspect-video">
                    <img 
                      src={p.image} 
                      srcSet={p.imageLarge ? `${p.image} 800w, ${p.imageLarge} 1200w` : undefined}
                      sizes="(max-width: 768px) 85vw, 380px"
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-90 group-hover/card:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80" />
                    
                    {/* Badge / Category Label */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[var(--color-text-primary)] bg-[var(--color-surface-glass)] backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--color-border)] font-semibold shadow-sm">
                        {p.industry}
                      </span>
                      {p.isDemo && (
                        <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 bg-amber-500/20 backdrop-blur-md px-2 py-1 rounded-full border border-amber-500/40 flex items-center gap-1 font-semibold">
                          <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>CONCEPT / DEMO</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-2">
                    <div className="text-[11px] font-mono text-[var(--color-brand)] font-semibold">{p.category}</div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] group-hover/card:text-[var(--color-brand)] transition-colors leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                      {p.summary}
                    </p>
                  </div>
                </div>

                {/* View Project Action */}
                <div className="p-6 pt-0">
                  <Link 
                    to={`/projects/${p.slug}`}
                    className="w-full py-3 rounded-xl bg-[var(--color-surface-hover)] hover:bg-[var(--color-brand)] text-[var(--color-text-primary)] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 group/btn border border-[var(--color-border)] hover:border-[var(--color-brand)] shadow-sm"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamically Synchronized Pagination Dots */}
        {totalPositions > 1 && (
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPositions }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToPosition(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activePosition === idx ? 'w-6 bg-[var(--color-accent-lime)]' : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]'
                  }`}
                  aria-label={`Go to position ${idx + 1}`}
                />
              ))}
            </div>

            <Link 
              to="/projects"
              className="sm:hidden text-xs font-bold text-[var(--color-brand)] flex items-center gap-1"
            >
              <span>All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </RevealOnScroll>
    </section>
  );
}
