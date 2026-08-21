import React from 'react';
import { ShieldCheck, Code2, Cpu, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function TrustShowcase({ onOpenConsultation }) {
  const trustPillars = [
    {
      icon: Eye,
      title: "Live Product Walkthroughs",
      desc: "We show real, operational software storyboards and interactive system demos rather than fabricated client reviews or fake statistics."
    },
    {
      icon: Code2,
      title: "Clean Modern Engineering",
      desc: "Built on high-speed React, Vite, Node, and Tailwind infrastructure. Zero bloated website builders, zero unmaintained plugins."
    },
    {
      icon: ShieldCheck,
      title: "Transparent Technical Audits",
      desc: "Every project receives clear architecture diagrams, database schemas, and API documentation so you retain 100% ownership."
    },
    {
      icon: Cpu,
      title: "Direct Tech Architect Contact",
      desc: "You consult directly with senior system architects and product engineers—not aggressive sales representatives."
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] relative transition-colors duration-200">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
              TRUST & CREDIBILITY COMMITMENT
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Grounded Tech Standards. Zero Manufactured Claims.
            </h2>

            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
              As an ambitious technology company, Sarvon Tech believes true trust is built through code quality, operational transparency, and functional live product demonstrations.
            </p>

            <div className="p-4 rounded-2xl glass-panel border border-[var(--color-border)] space-y-2 text-xs text-[var(--color-text-secondary)]">
              <div className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-lime)]" />
                <span>Our Engineering Promise</span>
              </div>
              <p className="text-[var(--color-text-muted)]">
                We deliver clean codebase handoffs, full administrative access, and comprehensive technical documentation for every digital system we deploy.
              </p>
            </div>

            <button 
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Tech Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {trustPillars.map((tp, idx) => {
              const Icon = tp.icon;
              return (
                <div 
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all space-y-3"
                >
                  <div className="p-3 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)] w-fit border border-[var(--color-border)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {tp.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {tp.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </RevealOnScroll>
    </section>
  );
}
