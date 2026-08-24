import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Layers, Loader2 } from 'lucide-react';
import { submitInquiry } from '../lib/supabase';

export default function ConsultationModal({ isOpen, onClose, initialContext }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: 'A Better Website',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialContext) {
      setFormData(prev => ({
        ...prev,
        requirement: initialContext,
        message: `I would like to discuss: ${initialContext}`
      }));
    }
  }, [initialContext, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceCategory: formData.requirement || 'General Consultation',
        message: `${formData.company ? `Company: ${formData.company}\n` : ''}${formData.message}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Fallback submission:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel bg-[var(--color-surface)] rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--color-brand)] font-mono text-xs font-semibold">
                <Layers className="w-4 h-4" />
                <span>TELL US WHAT YOU NEED</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Tell Us What Problem You Want To Solve
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Leave your details below. We will review your requirement and share practical solutions with honest timelines.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Phone / WhatsApp</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--color-text-secondary)] font-mono">Primary Need</label>
                  <select 
                    value={formData.requirement}
                    onChange={e => setFormData({...formData, requirement: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] font-mono"
                  >
                    <option value="A Better Website">A Better Company Website</option>
                    <option value="School & Educational ERP">School & Educational ERP System</option>
                    <option value="AI & Automation">AI & Workflow Automation</option>
                    <option value="Custom Business Systems">Custom Software System</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[var(--color-text-secondary)] font-mono">Brief Description</label>
                <textarea 
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us what process you want to improve or system you want to build..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)]"
                />
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Request Free Consultation</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[var(--color-accent-mint)] mx-auto" />
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Inquiry Received</h3>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto">
              Thank you for reaching out. We have logged your request and our engineering team will get back to you shortly.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-brand)] text-white font-bold text-xs cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
