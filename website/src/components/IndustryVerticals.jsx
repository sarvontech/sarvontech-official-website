import React from 'react';
import { INDUSTRIES_HUMANIZED } from '../data/servonData';
import { Building2, Stethoscope, GraduationCap, ShoppingBag, Factory, HeartHandshake, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function IndustryVerticals({ onOpenConsultation }) {
  const getIndustryIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'Factory': return <Factory className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[var(--color-accent-mint)]" />;
      default: return <Building2 className="w-6 h-6 text-[var(--color-brand)]" />;
    }
  };

  return (
    <section id="industries" className="py-20 bg-[var(--color-bg-primary)] relative transition-colors duration-200">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
            INDUSTRIES & SECTORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Tailored to Your Business Sector
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            We adapt digital solutions to match the operational realities of your specific industry.
          </p>
        </div>

        {/* 6 Clean Industry Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_HUMANIZED.map((ind) => (
            <div
              key={ind.id}
              className="p-6 rounded-2xl glass-card border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--color-brand-light)] border border-[var(--color-border)] w-fit group-hover:scale-105 transition-transform">
                  {getIndustryIcon(ind.icon)}
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                  {ind.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {ind.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)]">
                <button 
                  onClick={() => onOpenConsultation(ind.title)}
                  className="text-xs font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] flex items-center gap-1.5 transition-colors group/btn cursor-pointer"
                >
                  <span>Discuss {ind.title} Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </RevealOnScroll>
    </section>
  );
}
