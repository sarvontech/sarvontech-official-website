import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Layers } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
                Share a few details below. Our team will review your requirement and guide you to the right solution.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                <label className="text-[var(--color-text-secondary)] font-mono">WHAT ARE YOU LOOKING TO SOLVE?</label>
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
                <label className="text-[var(--color-text-secondary)] font-mono">BRIEF OVERVIEW (OPTIONAL)</label>
                <textarea 
                  rows={3}
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
                <span>Submit & Schedule Solution Discussion</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-mint)] flex items-center justify-center mx-auto border border-[var(--color-border)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
              We'll Be In Touch Shortly!
            </h3>

            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto">
              Thank you, <span className="text-[var(--color-text-primary)] font-semibold">{formData.name}</span>. A Sarvon Tech specialist will review your inquiry regarding <span className="text-[var(--color-brand)] font-semibold">{formData.requirement}</span> and reach out to help you figure out the best next step.
            </p>

            <button 
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] text-xs font-semibold border border-[var(--color-border)] cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
