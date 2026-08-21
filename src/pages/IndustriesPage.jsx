import React from 'react';
import SEOHead from '../components/SEOHead';
import { INDUSTRIES_HUMANIZED } from '../data/servonData';
import { Building2, Stethoscope, GraduationCap, ShoppingBag, Factory, HeartHandshake, ArrowRight } from 'lucide-react';

export default function IndustriesPage({ onOpenConsultation }) {
  const getIndustryIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-8 h-8 text-[var(--color-brand)]" />;
      case 'Stethoscope': return <Stethoscope className="w-8 h-8 text-[var(--color-brand)]" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-[var(--color-brand)]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-8 h-8 text-[var(--color-brand)]" />;
      case 'Factory': return <Factory className="w-8 h-8 text-[var(--color-brand)]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-[var(--color-accent-mint)]" />;
      default: return <Building2 className="w-8 h-8 text-[var(--color-brand)]" />;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="Industry Solutions & Sector Systems" 
        description="Discover custom digital solutions for Real Estate, Healthcare, Education, Retail, Manufacturing, and Organizations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
            SECTOR-SPECIFIC CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Industries We Serve
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Every business sector has specific operational realities. We adapt software, CRM workflows, and digital presence to match your industry model.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES_HUMANIZED.map((ind) => (
            <div 
              key={ind.id}
              className="glass-card rounded-3xl p-8 border border-[var(--color-border)] space-y-6 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)] w-fit">
                  {getIndustryIcon(ind.icon)}
                </div>

                <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{ind.title}</h2>
                <div className="text-xs font-mono text-[var(--color-brand)] font-semibold">{ind.tagline}</div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{ind.description}</p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]">
                <button 
                  onClick={() => onOpenConsultation(`Industry: ${ind.title}`)}
                  className="w-full py-3 rounded-xl bg-[var(--color-surface-hover)] hover:bg-[var(--color-brand)] text-[var(--color-text-primary)] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-[var(--color-border)] hover:border-[var(--color-brand)] cursor-pointer"
                >
                  <span>Discuss {ind.title} Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
