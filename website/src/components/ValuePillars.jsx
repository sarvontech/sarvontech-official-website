import React from 'react';
import { Globe, Database, Cpu } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function ValuePillars() {
  const pillars = [
    {
      icon: Globe,
      badge: "PILLAR 01",
      title: "Digital Solutions",
      subtitle: "Websites & Portals",
      desc: "High-performance business websites, corporate flagships, institutional portals, and e-commerce platforms built for conversion and speed.",
      points: ["Sub-1.2s Load Speed", "Mobile-First UX", "Headless CMS Integration"]
    },
    {
      icon: Database,
      badge: "PILLAR 02",
      title: "Business Software",
      subtitle: "Custom SaaS & Tools",
      desc: "Tailored CRM engines, real-estate lead tools, multi-provider appointment systems, and inventory platforms that streamline operations.",
      points: ["Unified Operational Data", "Role-Based Access", "Custom API Integrations"]
    },
    {
      icon: Cpu,
      badge: "PILLAR 03",
      title: "AI & Automation",
      subtitle: "Smart Revenue Engines",
      desc: "24/7 AI business assistants, instant lead scoring bots, WhatsApp notification workflows, and automated executive reporting engines.",
      points: ["Instant Prospect Qualification", "24/7 Customer Engagement", "Zero Manual Copy-Pasting"]
    }
  ];

  return (
    <section className="py-16 bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] relative transition-colors duration-200">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-light)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-brand)] font-semibold">
            SARVON TECH CORE OPERATIONAL PILLARS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            How We Solve Business Challenges
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            We don't offer generic templates. We build specialized digital assets and software products tailored to your revenue model.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="glass-card rounded-2xl p-6 relative group border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)] tracking-wider">
                      {p.badge}
                    </span>
                    <span className="p-2.5 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-brand)] transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--color-brand)] mb-3">{p.subtitle}</div>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
                  {p.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-lime)]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </RevealOnScroll>
    </section>
  );
}
