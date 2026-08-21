import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: 'A Better Website',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="Contact Sarvon Tech — Let's Solve Your Problem" 
        description="Schedule a consultation with Sarvon Tech technology leads to discuss your web, business software, or AI automation requirement."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest bg-[var(--color-brand-light)] px-3 py-1 rounded-full border border-[var(--color-border)] font-semibold">
            LET'S TALK
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Tell Us What You Need
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            You don't need to know the exact technology stack. Share what is difficult or manual in your business, and we'll help you figure out the right solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-[var(--color-border)] space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Direct Communication</h2>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)] border border-[var(--color-border)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[var(--color-text-muted)] font-mono">EMAIL US</div>
                    <div className="text-[var(--color-text-primary)] font-semibold">contact@sarvontech.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-mint)] border border-[var(--color-border)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[var(--color-text-muted)] font-mono">CALL / WHATSAPP</div>
                    <div className="text-[var(--color-text-primary)] font-semibold">+91 98348 57370</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-[var(--color-border)] space-y-2 text-xs text-[var(--color-text-secondary)]">
              <div className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-lime)]" />
                <span>Zero Sales Pressure</span>
              </div>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                You consult directly with senior software architects and technology leads—never commission sales reps.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border border-[var(--color-border)] shadow-xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Send Us Your Inquiry</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[var(--color-text-secondary)] font-mono">YOUR NAME *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[var(--color-text-secondary)] font-mono">WORK EMAIL / PHONE *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Email or WhatsApp number"
                        className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[var(--color-text-secondary)] font-mono">WHAT DO YOU NEED?</label>
                    <select 
                      value={formData.requirement}
                      onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                      className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                    >
                      <option value="A Better Website">A Better Website</option>
                      <option value="More & Better Leads">More & Better Leads</option>
                      <option value="Organized Lead Follow-ups">Organized Lead Follow-ups / CRM</option>
                      <option value="Online Appointment Booking">Online Appointment Booking System</option>
                      <option value="Inventory & Stock Control">Inventory & Multi-Store Control</option>
                      <option value="Automate Repetitive Work">Automate Repetitive Work / AI</option>
                      <option value="A Custom Digital System">A Custom Business Software System</option>
                      <option value="I'm Not Sure Yet">I'm Not Sure Yet (Let's Figure It Out)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[var(--color-text-secondary)] font-mono">BRIEF PROJECT OVERVIEW</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us what is slow, manual, or difficult in your business today..."
                      className="w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-mint)] flex items-center justify-center mx-auto border border-[var(--color-border)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Inquiry Received!</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto">
                    Thank you, <span className="text-[var(--color-text-primary)] font-semibold">{formData.name}</span>. A technology specialist will contact you at <span className="text-[var(--color-brand)] font-semibold">{formData.email}</span> shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] text-xs font-semibold border border-[var(--color-border)] cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
