import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function HowWeWork({ onOpenConsultation }) {
  const steps = [
    { step: "01", title: "Discover", desc: "We listen to your business goals and identify what is currently slow or manual." },
    { step: "02", title: "Plan", desc: "We design a clear digital solution blueprint with exact features and timelines." },
    { step: "03", title: "Build", desc: "We develop high-performance software tailored specifically around your business." },
    { step: "04", title: "Launch", desc: "We deploy your system securely and train your team for smooth daily usage." },
    { step: "05", title: "Improve", desc: "We provide ongoing updates, optimization, and support as your business expands." }
  ];

  return (
    <section id="how-we-work" className="py-20 bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] relative transition-colors duration-200">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
            SIMPLE PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            How We Work Together
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            A straightforward 5-step journey from business problem to working digital solution.
          </p>
        </div>

        {/* 5 Process Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-5 border border-[var(--color-border)] relative flex flex-col justify-between group hover:border-[var(--color-brand)] transition-all space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold font-mono text-[var(--color-brand)]">
                    {s.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)]" />
                </div>

                <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
                  {s.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-lime)]" />
                <span>Clear Milestone</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="text-center">
          <button 
            onClick={() => onOpenConsultation("Start Step 1: Discovery")}
            className="px-6 py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Tell Us What You Need</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </RevealOnScroll>
    </section>
  );
}
