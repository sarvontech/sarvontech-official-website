import React, { useState } from 'react';
import { PRODUCTS_HUMANIZED } from '../data/servonData';
import { Layers, ArrowRight, ChevronRight, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function ProductsShowcase({ onOpenConsultation }) {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const product = PRODUCTS_HUMANIZED[activeProductIndex];

  return (
    <section id="products" className="py-24 bg-[var(--color-bg-primary)] border-y border-[var(--color-border)] relative overflow-hidden transition-colors duration-200">
      
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-brand-light)] blur-[150px] rounded-full pointer-events-none" />

      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-brand)] font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>SARVON TECH LABS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Proprietary SaaS Solutions Built by Our Team
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            In addition to custom client engineering, we build and maintain ready-to-deploy software engines designed to solve specific operational bottlenecks.
          </p>
        </div>

        {/* Product Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {PRODUCTS_HUMANIZED.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveProductIndex(idx);
                setActiveStepIndex(0);
              }}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
                activeProductIndex === idx
                  ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-md'
                  : 'glass-panel text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Product Showcase Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[var(--color-border)] shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Story Column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
                  {product.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mt-3 mb-1">
                  {product.name}
                </h3>
                <p className="text-[var(--color-brand)] text-sm font-semibold">{product.tagline}</p>
              </div>

              {/* Problem / Solution / Benefit Cards */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[var(--color-card-problem-bg)] border border-[var(--color-card-problem-border)] space-y-1 text-xs">
                  <div className="font-bold text-[var(--color-card-problem-text)] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>The Problem Today</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{product.problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-border)] space-y-1 text-xs">
                  <div className="font-bold text-[var(--color-brand)] flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>The Sarvon Tech Solution</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{product.solution}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-card-solution-bg)] border border-[var(--color-card-solution-border)] space-y-1 text-xs">
                  <div className="font-bold text-[var(--color-card-solution-text)] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>What Becomes Easier</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{product.benefit}</p>
                </div>
              </div>

              <button 
                onClick={() => onOpenConsultation(product.name)}
                className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>{product.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

            {/* Right Product Workflow Visual */}
            <div className="lg:col-span-6">
              <div className="glass-panel rounded-2xl p-6 border border-[var(--color-border)] h-full flex flex-col justify-between space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <span className="text-xs font-mono text-[var(--color-text-secondary)] font-semibold">
                    HOW IT WORKS (STEP BY STEP)
                  </span>
                  <span className="text-xs font-mono text-[var(--color-brand)]">
                    Step {activeStepIndex + 1} of {product.storySteps.length}
                  </span>
                </div>

                {/* Active Step Visual Box */}
                <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-brand)] space-y-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)] text-white font-bold font-mono text-sm flex items-center justify-center">
                      {product.storySteps[activeStepIndex].step}
                    </div>
                    <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {product.storySteps[activeStepIndex].title}
                    </h4>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {product.storySteps[activeStepIndex].desc}
                  </p>
                </div>

                {/* Step Switcher List */}
                <div className="space-y-2">
                  {product.storySteps.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between border cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] font-bold'
                          : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[var(--color-brand)] font-bold">{s.step}.</span>
                        <span>{s.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeStepIndex === idx ? 'rotate-90 text-[var(--color-brand)]' : ''}`} />
                    </button>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

      </RevealOnScroll>
    </section>
  );
}
