import React from 'react';
import SEOHead from '../components/SEOHead';
import { PRODUCTS_HUMANIZED } from '../data/servonData';
import { Layers, ArrowRight, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

export default function ProductsPage({ onOpenConsultation }) {
  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="Products We're Building — Sarvon Tech Labs" 
        description="Explore Sarvon Tech's proprietary platforms: School ERP System, Smart Booking System, and Multi-Store Inventory Control."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-brand)] font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>SARVON TECH LABS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Products We're Building
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            In addition to custom client projects, Sarvon Tech develops proprietary technology platforms engineered to solve specific industry bottlenecks.
          </p>
        </div>

        <div className="space-y-12">
          {PRODUCTS_HUMANIZED.map((p) => (
            <div 
              key={p.id}
              id={p.slug}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-[var(--color-border)] space-y-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-[var(--color-border)]">
                <div>
                  <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
                    {p.badge}
                  </span>
                  <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mt-3">{p.name}</h2>
                  <p className="text-[var(--color-brand)] text-sm font-semibold">{p.tagline}</p>
                </div>

                <button 
                  onClick={() => onOpenConsultation(p.name)}
                  className="px-6 py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-xs flex items-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
                >
                  <span>Request Platform Deployment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-xs text-[var(--color-text-secondary)]">
                <div className="p-5 rounded-2xl bg-[var(--color-card-problem-bg)] border border-[var(--color-card-problem-border)] space-y-2">
                  <div className="font-bold text-[var(--color-card-problem-text)] text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>The Problem</span>
                  </div>
                  <p className="leading-relaxed">{p.problem}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)] space-y-2">
                  <div className="font-bold text-[var(--color-brand)] text-sm flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>The Solution</span>
                  </div>
                  <p className="leading-relaxed">{p.solution}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--color-card-solution-bg)] border border-[var(--color-card-solution-border)] space-y-2">
                  <div className="font-bold text-[var(--color-card-solution-text)] text-sm flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>What Becomes Easier</span>
                  </div>
                  <p className="leading-relaxed">{p.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
