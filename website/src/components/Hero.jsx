import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle, Layers } from 'lucide-react';

export default function Hero({ onOpenConsultation }) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[var(--color-bg-primary)] transition-colors duration-200">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[var(--color-brand-light)] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Value Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-brand)]">
              <Layers className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              <span>Digital Solutions & Software Partner</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.15]">
              Digital Solutions That Help Your{' '}
              <span className="relative inline-block text-[var(--color-brand)]">
                Business Grow
                <span className="absolute bottom-1 left-0 w-full h-2 bg-[var(--color-accent-lime)] -z-10 rounded-full opacity-80" />
              </span>
            </h1>

            {/* Short Supporting Copy */}
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed font-normal">
              From websites and custom software to School ERP platforms, automation and AI, we build practical digital solutions around the way your organization works.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => onOpenConsultation()}
                className="px-7 py-4 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-base shadow-md flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Tell Us What You Need</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a 
                href="#solutions"
                className="px-6 py-4 rounded-xl glass-panel text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] font-semibold text-base border border-[var(--color-border)] flex items-center gap-2 transition-colors"
              >
                <span>Explore Solutions</span>
                <ChevronRight className="w-4 h-4 text-[var(--color-brand)]" />
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-6 text-xs text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--color-accent-lime)]" />
                <span>Understands Business Problems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--color-brand)]" />
                <span>Custom Built for You</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--color-accent-mint)]" />
                <span>Practical AI Integration</span>
              </div>
            </div>

          </div>

          {/* Right Visual: Business System Outcome Card */}
          <div className="lg:col-span-5">
            <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-lime)]" />
                  <span className="text-xs font-mono text-[var(--color-text-secondary)] font-medium">
                    Sarvon Tech Solution Hub
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--color-brand)] bg-[var(--color-brand-light)] px-2.5 py-0.5 rounded border border-[var(--color-border)]">
                  Business Impact
                </span>
              </div>

              {/* Business Outcome Showcase */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
                  <div className="text-xs font-mono text-[var(--color-brand)] uppercase font-semibold">1. Web & Digital Presence</div>
                  <div className="text-sm font-bold text-[var(--color-text-primary)]">Convert Visitors Into Real Enquiries</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Fast, mobile-friendly websites designed for maximum trust.</div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
                  <div className="text-xs font-mono text-[var(--color-brand)] uppercase font-semibold">2. School ERP & Management Systems</div>
                  <div className="text-sm font-bold text-[var(--color-text-primary)]">Streamline School Admin & Admissions</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Automate fee collection, student attendance, report cards & parent updates.</div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
                  <div className="text-xs font-mono text-[var(--color-accent-mint)] uppercase font-semibold">3. AI & Automation</div>
                  <div className="text-sm font-bold text-[var(--color-text-primary)]">Automate Repetitive Work 24/7</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Let AI answer queries and schedule appointments automatically.</div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button 
                  onClick={() => onOpenConsultation()}
                  className="w-full py-3 rounded-xl bg-[var(--color-brand-light)] hover:bg-[var(--color-surface-hover)] text-[var(--color-brand)] font-semibold text-xs transition-colors border border-[var(--color-border)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Tell Us What Problem You Want To Solve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
