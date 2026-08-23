import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SOLUTIONS_CATEGORIES } from '../data/servonData';
import { Globe, Database, Cpu, HeartHandshake, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function SolutionsGrid({ onOpenConsultation }) {
  const scrollRef = useRef(null);
  const [activePosition, setActivePosition] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'Database': return <Database className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[var(--color-accent-mint)]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[var(--color-brand)]" />;
      default: return <Globe className="w-6 h-6 text-[var(--color-brand)]" />;
    }
  };

  const getVisibleItems = useCallback((width) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }, []);

  const totalItems = SOLUTIONS_CATEGORIES.length;
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

  return (
    <section id="solutions" className="py-20 bg-[var(--color-bg-primary)] relative overflow-hidden transition-colors duration-200">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Digital Solutions Engineered Around Your Business
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base max-w-xl">
              We build custom digital assets, operational software, and practical AI systems designed to help your business grow.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToPosition(activePosition - 1)}
              disabled={activePosition === 0}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                activePosition > 0
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-brand)]' 
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)] opacity-50 cursor-not-allowed'
              }`}
              aria-label="Previous Solution"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollToPosition(activePosition + 1)}
              disabled={activePosition >= totalPositions - 1}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                activePosition < totalPositions - 1
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-brand)]' 
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)] opacity-50 cursor-not-allowed'
              }`}
              aria-label="Next Solution"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Single Horizontal Slider Track */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-6 pt-1 no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {SOLUTIONS_CATEGORIES.map((cat) => (
              <div 
                key={cat.id}
                className="w-[85vw] sm:w-[340px] lg:w-[370px] xl:w-[390px] flex-shrink-0 snap-start glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)] group-hover:scale-105 transition-transform">
                      {getIcon(cat.icon)}
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-brand)] bg-[var(--color-brand-light)] px-2.5 py-1 rounded-full border border-[var(--color-border)] font-semibold">
                      {cat.shortTitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                      {cat.headline}
                    </h3>
                    <div className="text-xs font-mono text-[var(--color-brand)] mb-2 font-medium">{cat.tagline}</div>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    {cat.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                        <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--color-border)] mt-6">
                  <button 
                    onClick={() => onOpenConsultation(cat.headline)}
                    className="w-full py-3 rounded-xl bg-[var(--color-surface-hover)] hover:bg-[var(--color-brand)] text-[var(--color-text-primary)] hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn border border-[var(--color-border)] hover:border-[var(--color-brand)] shadow-sm cursor-pointer"
                  >
                    <span>Tell Us What You Need</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamically Synchronized Pagination Indicators */}
        {totalPositions > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
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
        )}

      </RevealOnScroll>
    </section>
  );
}
