import React from 'react';
import SEOHead from '../components/SEOHead';
import WhyServonTech from '../components/WhyServonTech';
import HowWeWork from '../components/HowWeWork';
import { Layers } from 'lucide-react';

export default function AboutPage({ onOpenConsultation }) {
  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="About Sarvon Tech — Philosophy & Engineering Standards" 
        description="Learn about Sarvon Tech's mission to build practical digital solutions, custom software systems, and AI automation for growing businesses."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-brand)] font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>ABOUT SARVON TECH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            We Build Digital Systems That Solve Business Problems.
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Sarvon Tech is a modern digital solutions company, software product developer, and AI automation partner.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[var(--color-border)] space-y-6 max-w-4xl mx-auto text-sm text-[var(--color-text-secondary)] leading-relaxed shadow-xl">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Our Engineering Philosophy</h2>
          <p>
            We believe technology should serve business goals—not the other way around. Most companies don't need buzzword-heavy marketing; they need reliable digital presence, organized administrative workflows, and automated operational processes.
          </p>
          <p>
            Whether we are designing a modern web portal for an academic institution, building a School ERP platform, or developing AI booking assistants, our focus remains unchanged: <strong className="text-[var(--color-text-primary)]">clarity, speed, and real business value.</strong>
          </p>
        </div>

        <WhyServonTech />

        <HowWeWork onOpenConsultation={onOpenConsultation} />

      </div>
    </div>
  );
}
