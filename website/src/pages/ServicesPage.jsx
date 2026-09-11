import React, { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { getLiveServices } from '../lib/supabase';
import InteractiveStorySection from '../components/InteractiveStorySection';
import RevealOnScroll from '../components/RevealOnScroll';
import { 
  ArrowRight, Sparkles, Loader2
} from 'lucide-react';

export default function ServicesPage({ onOpenConsultation }) {
  const [selectedStory, setSelectedStory] = useState('healthcare');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      const data = await getLiveServices();
      setServices(data);
      setLoading(false);
    }
    loadServices();
  }, []);

  const handleExploreService = (targetStoryId) => {
    setSelectedStory(targetStoryId);
    const storyElem = document.getElementById('interactive-story');
    if (storyElem) {
      storyElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (onOpenConsultation) {
        onOpenConsultation('Service Exploration Request');
      }
    }
  };

  const transformations = [
    {
      beforeTitle: "Manual Updates & Developer Delays",
      afterTitle: "Self-Service Content Control",
      desc: "Update schedules, pricing, and content directly without paying a developer for routine edits."
    },
    {
      beforeTitle: "Scattered Records & Manual Registers",
      afterTitle: "Centralized School ERP System",
      desc: "Unify admissions, student fees, attendance, report cards, and parent communication into one platform."
    },
    {
      beforeTitle: "Phone Bottlenecks & No-Shows",
      afterTitle: "24/7 Online Appointment Engine",
      desc: "Patients & clients book open slots 24/7 with automated WhatsApp reminder loops."
    },
    {
      beforeTitle: "Disconnected Tools & Double-Entry",
      afterTitle: "Unified Custom Software System",
      desc: "Consolidate inventory, team tasks, and operational metrics into one central platform."
    }
  ];

  const deliverySteps = [
    {
      step: "01",
      title: "Understand",
      desc: "We analyze your operational bottlenecks, customer touchpoints, and business goals first—not technical jargon."
    },
    {
      step: "02",
      title: "Design",
      desc: "We architect clean, mobile-first user interfaces and software logic tailored strictly to how your business operates."
    },
    {
      step: "03",
      title: "Build",
      desc: "Engineered on high-speed React, Vite, Node, and Tailwind infrastructure for sub-1.2s load speeds and zero bloat."
    },
    {
      step: "04",
      title: "Launch & Improve",
      desc: "We deploy your digital asset with 100% codebase ownership, staff training, and continuous technical refinement."
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="Digital Services & Business Solutions | SarvonTech" 
        description="ServonTech builds websites, custom software, School ERPs, booking platforms, e-commerce systems and AI-powered digital solutions tailored to the way your business works."
      />

      {/* SERVICES OVERVIEW SECTION (VISUAL-FIRST CARDS) */}
      <section id="services-overview" className="py-12 bg-[var(--color-bg-primary)] transition-colors duration-200">
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-semibold uppercase tracking-wider bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-lime)]" />
              <span>DIGITAL CAPABILITIES</span>
            </span>
            <h1 className="text-3xl sm:text-[2.5rem] font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight">
              Digital Solutions Built Around Your Business.
            </h1>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
              From your first website to connected software, automation and AI — we build what your business actually needs.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[var(--color-brand)]" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((cat, idx) => (
                <div 
                  key={cat.id}
                  className="glass-card rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all duration-300 flex flex-col justify-between group shadow-md"
                >
                  {/* Visual Product Image (Occupies ~50% Height) */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)]">
                    <img 
                      src={cat.image} 
                      alt={cat.alt} 
                      loading={idx < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover object-top transform group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Content Area (~50% Height) */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider block">
                        {String(idx + 1).padStart(2, '0')} &bull; {(cat.category_label || cat.categoryLabel || '').replace(/^\d+\s*\?\?\s*/, '')}
                      </span>
                      <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {cat.short_value || cat.shortValue}
                      </p>
                    </div>

                    {/* Clean CTA */}
                    <div className="pt-2 border-t border-[var(--color-border-subtle)]">
                      <button
                        onClick={() => handleExploreService(cat.targetStory || 'custom-business-systems')}
                        className="text-xs font-bold text-[var(--color-brand)] group-hover:text-[var(--color-brand-hover)] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>See How It Works</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Optional Consultation CTA */}
          <div className="text-center pt-4">
            <button
              onClick={() => onOpenConsultation('General Digital System Consultation')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] bg-[var(--color-brand-light)] px-5 py-2.5 rounded-full border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Not sure what you need? Tell us your business problem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </RevealOnScroll>
      </section>

      {/* INTERACTIVE STORY CENTERPIECE EXPERIENCE */}
      <InteractiveStorySection 
        selectedStoryId={selectedStory}
        onSelectStory={(storyId) => setSelectedStory(storyId)}
      />

      {/* WHAT CHANGES AFTER WE BUILD IT? (BEFORE / AFTER CARDS) */}
      <section className="py-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] transition-colors duration-200">
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-semibold uppercase tracking-wider bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              MEASURABLE TRANSFORMATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              What Changes After We Build It?
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base">
              Real operational improvements delivered to your daily business operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {transformations.map((tf, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-2xl p-6 border border-[var(--color-border)] space-y-4 hover:border-[var(--color-brand)] transition-all shadow-md flex flex-col justify-between"
              >
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[var(--color-card-problem-bg)] border border-[var(--color-card-problem-border)] text-[var(--color-card-problem-text)] space-y-1">
                    <span className="text-[10px] font-mono font-bold block opacity-70">BEFORE</span>
                    <span className="font-semibold block">{tf.beforeTitle}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--color-card-solution-bg)] border border-[var(--color-card-solution-border)] text-[var(--color-card-solution-text)] space-y-1">
                    <span className="text-[10px] font-mono font-bold block opacity-70">AFTER</span>
                    <span className="font-semibold block">{tf.afterTitle}</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed pt-1">
                  {tf.desc}
                </p>
              </div>
            ))}
          </div>

        </RevealOnScroll>
      </section>

      {/* HOW WE DELIVER */}
      <section className="py-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-semibold uppercase tracking-wider bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              ENGINEERING METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              From Business Problem to Working System.
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base">
              A structured 4-step delivery process built for speed, transparency, and operational clarity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((st, i) => (
              <div 
                key={i}
                className="glass-card rounded-2xl p-6 border border-[var(--color-border)] space-y-3 hover:border-[var(--color-brand)] transition-all shadow-md relative"
              >
                <span className="text-2xl font-mono font-extrabold text-[var(--color-brand)] opacity-80">
                  {st.step}
                </span>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {st.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

        </RevealOnScroll>
      </section>
    </div>
  );
}
