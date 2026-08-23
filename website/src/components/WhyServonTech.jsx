import React from 'react';
import { WHY_SERVONTECH } from '../data/servonData';
import { HeartHandshake, Settings, Cpu, TrendingUp } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function WhyServonTech() {
  const icons = [HeartHandshake, Settings, Cpu, TrendingUp];

  return (
    <section id="why-us" className="py-20 bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] relative transition-colors duration-200">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Why Work With Sarvon Tech?
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            We operate as your long-term technology partner, focusing on business value rather than technical jargon.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_SERVONTECH.map((w, idx) => {
            const Icon = icons[idx] || HeartHandshake;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl glass-card border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all space-y-3"
              >
                <div className="p-3 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)] border border-[var(--color-border)] w-fit">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {w.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {w.desc}
                </p>
              </div>
            );
          })}
        </div>

      </RevealOnScroll>
    </section>
  );
}
