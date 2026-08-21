import React from 'react';
import { PRACTICAL_AI } from '../data/servonData';
import { Cpu, Bot, ArrowRight, ShieldCheck } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function PracticalAI({ onOpenConsultation }) {
  return (
    <section className="py-24 bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] relative transition-colors duration-200">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-accent-soft)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-accent-mint)] font-semibold">
            <Cpu className="w-3.5 h-3.5 text-[var(--color-accent-mint)]" />
            <span>PRACTICAL AI FOR BUSINESS VALUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            AI Presented as Practical Capability, Not Buzzwords
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            We don't sell generic "AI magic". We build specific, reliable automation workflows that save hours of human labor and capture high-intent leads 24/7.
          </p>
        </div>

        {/* 3 Practical AI Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {PRACTICAL_AI.map((ai, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[var(--color-accent-soft)] border border-[var(--color-border)] text-[var(--color-accent-mint)] w-fit">
                  <Bot className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                  {ai.title}
                </h3>

                <div className="p-3 rounded-xl bg-[var(--color-card-problem-bg)] border border-[var(--color-card-problem-border)] text-xs text-[var(--color-card-problem-text)]">
                  <span className="font-semibold">Current Problem:</span> {ai.problem}
                </div>

                <div className="p-3 rounded-xl bg-[var(--color-card-solution-bg)] border border-[var(--color-card-solution-border)] text-xs text-[var(--color-card-solution-text)]">
                  <span className="font-semibold">Sarvon Tech AI Solution:</span> {ai.solution}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)] mt-6 flex items-center justify-between text-xs font-mono text-[var(--color-accent-mint)]">
                <span>IMPACT:</span>
                <span className="font-bold">{ai.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Philosophy Banner */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--color-accent-mint)] flex-shrink-0" />
            <span>All Sarvon Tech AI integrations run on encrypted cloud servers with strict data privacy protocols.</span>
          </div>

          <button 
            onClick={onOpenConsultation}
            className="px-4 py-2 rounded-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
          >
            <span>Explore AI Integration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </RevealOnScroll>
    </section>
  );
}
