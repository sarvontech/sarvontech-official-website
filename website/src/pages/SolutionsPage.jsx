import React from 'react';
import SEOHead from '../components/SEOHead';
import { SOLUTIONS_CATEGORIES } from '../data/servonData';
import { Globe, Database, Cpu, HeartHandshake, ArrowRight } from 'lucide-react';

export default function SolutionsPage({ onOpenConsultation }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-8 h-8 text-[var(--color-brand)]" />;
      case 'Database': return <Database className="w-8 h-8 text-[var(--color-brand)]" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-[var(--color-accent-mint)]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-[var(--color-brand)]" />;
      default: return <Globe className="w-8 h-8 text-[var(--color-brand)]" />;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="Digital Solutions & Capability Catalog" 
        description="Explore Sarvon Tech's solutions: high-converting websites, custom business software, CRM systems, and practical AI workflow automation."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
            SARVON TECH SOLUTIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            What Can Sarvon Tech Build For Your Business?
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            We architect digital systems designed around your revenue model, daily operations, and customer growth goals.
          </p>
        </div>

        {/* Detailed Solutions Cards */}
        <div className="space-y-12">
          {SOLUTIONS_CATEGORIES.map((sol) => (
            <div 
              key={sol.id} 
              id={sol.slug}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-[var(--color-border)] space-y-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)]">
                    {getIcon(sol.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--color-brand)] font-semibold">{sol.shortTitle}</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">{sol.headline}</h2>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenConsultation(sol.headline)}
                  className="px-6 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-xs flex items-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
                >
                  <span>Discuss This Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-xs text-[var(--color-text-secondary)]">
                <div className="space-y-2 p-5 rounded-2xl bg-[var(--color-card-problem-bg)] border border-[var(--color-card-problem-border)]">
                  <div className="font-bold text-[var(--color-card-problem-text)] text-sm">The Problem Solved</div>
                  <p className="leading-relaxed">{sol.detailedProblem}</p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)]">
                  <div className="font-bold text-[var(--color-brand)] text-sm">Who It Is For</div>
                  <p className="leading-relaxed">{sol.whoItIsFor}</p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-[var(--color-card-solution-bg)] border border-[var(--color-card-solution-border)]">
                  <div className="font-bold text-[var(--color-card-solution-text)] text-sm">Key Deliverables</div>
                  <ul className="space-y-1 list-disc list-inside">
                    {sol.whatWeBuild.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
