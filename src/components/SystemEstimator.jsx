import React, { useState } from 'react';
import { Sliders, ArrowRight, CheckCircle2, RotateCcw, Send } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function SystemEstimator({ onOpenConsultation }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('Custom Website & Digital Presence');
  const [industry, setIndustry] = useState('Real Estate');
  const [timeline, setTimeline] = useState('2 to 4 Weeks');
  const [submitted, setSubmitted] = useState(false);

  const goals = [
    'Custom Website & Digital Presence',
    'Business Software (CRM / ERP / Inventory)',
    'AI Workflow Automation',
    'Proprietary Platform Deployment'
  ];

  const industries = [
    'Real Estate & Construction',
    'Healthcare & Clinics',
    'Education & Academics',
    'Retail & E-Commerce',
    'Manufacturing & Industrial',
    'Professional Services'
  ];

  const timelines = [
    'Urgent (1 to 2 Weeks)',
    'Standard (2 to 4 Weeks)',
    'Comprehensive (4 to 8 Weeks)'
  ];

  const handleFinish = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[var(--color-bg-primary)] relative transition-colors duration-200">
      <RevealOnScroll className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
            INTERACTIVE SYSTEM BLUEPRINT ESTIMATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Configure Your Digital System Scope
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            Select your requirements below to receive an instant architectural scope summary and recommended timeline.
          </p>
        </div>

        {/* Estimator Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[var(--color-border)] shadow-xl space-y-8">
          
          {!submitted ? (
            <>
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[var(--color-brand)]" />
                  <span className="text-sm font-bold text-[var(--color-text-primary)] font-mono">
                    STEP {step} OF 3
                  </span>
                </div>

                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s}
                      className={`h-2 rounded-full transition-all ${
                        step === s ? 'w-8 bg-[var(--color-brand)]' : step > s ? 'w-4 bg-[var(--color-accent-lime)]' : 'w-4 bg-[var(--color-border)]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Select Goal */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                    1. What is your primary digital objective?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {goals.map((g, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setGoal(g)}
                        className={`p-4 rounded-xl text-left border text-sm font-semibold transition-all cursor-pointer ${
                          goal === g 
                            ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] shadow-sm'
                            : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next: Select Industry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Select Industry */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                    2. Which sector describes your organization?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {industries.map((ind, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIndustry(ind)}
                        className={`p-4 rounded-xl text-left border text-sm font-semibold transition-all cursor-pointer ${
                          industry === ind 
                            ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] shadow-sm'
                            : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between pt-4">
                    <button 
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] text-xs font-semibold cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button 
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next: Timeline & Summary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Timeline & Final Confirmation */}
              {step === 3 && (
                <form onSubmit={handleFinish} className="space-y-6">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                    3. Target Delivery Timeline & Summary
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[var(--color-text-secondary)]">SELECT TIMELINE EXPECTATION</label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {timelines.map((t, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTimeline(t)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                            timeline === t 
                              ? 'bg-[var(--color-brand-light)] border-[var(--color-brand)] text-[var(--color-brand)] font-bold'
                              : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary Scope Box */}
                  <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2 text-xs">
                    <div className="font-mono text-[var(--color-brand)] font-semibold">ESTIMATED ARCHITECTURAL SPECIFICATION</div>
                    <div className="grid sm:grid-cols-3 gap-2 text-[var(--color-text-secondary)]">
                      <div><span className="text-[var(--color-text-muted)] font-mono">OBJECTIVE:</span> {goal}</div>
                      <div><span className="text-[var(--color-text-muted)] font-mono">SECTOR:</span> {industry}</div>
                      <div><span className="text-[var(--color-text-muted)] font-mono">TIMELINE:</span> {timeline}</div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] text-xs font-semibold cursor-pointer"
                    >
                      ← Back
                    </button>
                    
                    <button 
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-sm flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Scope for Architectural Review</span>
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-mint)] flex items-center justify-center mx-auto border border-[var(--color-border)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Scope Received for Technical Review!
              </h3>

              <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
                Thank you. A Sarvon Tech software architect will review your configuration for <span className="text-[var(--color-brand)] font-semibold">{goal}</span> in <span className="text-[var(--color-accent-mint)] font-semibold">{industry}</span> and prepare a custom blueprint.
              </p>

              <button 
                onClick={() => { setSubmitted(false); setStep(1); }}
                className="px-4 py-2 rounded-xl bg-[var(--color-surface-hover)] hover:bg-[var(--color-surface)] text-[var(--color-text-primary)] text-xs font-mono inline-flex items-center gap-1.5 border border-[var(--color-border)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-configure Scope</span>
              </button>
            </div>
          )}

        </div>

      </RevealOnScroll>
    </section>
  );
}
