import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function ConsultationCTA({ onOpenConsultation }) {
  return (
    <section className="py-24 bg-[var(--color-bg-primary)] relative overflow-hidden transition-colors duration-200">
      <RevealOnScroll className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-center space-y-6 shadow-xl relative overflow-hidden">
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight">
            Let's Solve Your Business Problems{' '}
            <span className="relative inline-block text-[var(--color-brand)]">
              Together.
              <span className="absolute bottom-1 left-0 w-full h-2 bg-[var(--color-accent-lime)] -z-10 rounded-full opacity-80" />
            </span>
          </h2>

          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us what's currently slow, manual, disconnected or difficult in your business. We'll help you identify a practical digital solution built around the way you work.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-base shadow-md flex items-center justify-center gap-2.5 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Tell Us What You Need</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-8 border-t border-[var(--color-border)] flex flex-wrap justify-center gap-6 text-xs text-[var(--color-text-secondary)] font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-lime)]" />
              <span>30-Minute Business Consultation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-brand)]" />
              <span>Zero-Obligation Solution Blueprint</span>
            </div>
          </div>

        </div>
      </RevealOnScroll>
    </section>
  );
}
