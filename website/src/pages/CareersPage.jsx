import React, { useState, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import RevealOnScroll from '../components/RevealOnScroll';
import { 
  CAREERS_ROLES, 
  WORK_DOMAINS, 
  ENGINEERING_VALUES, 
  CAREER_GROWTH_STEPS, 
  TECH_STACK_ITEMS 
} from '../data/servonData';
import { 
  Briefcase, ArrowRight, CheckCircle2, Sparkles, Code2, Cpu, Database, 
  Stethoscope, Building2, Box, Globe, ChevronRight, X, Upload, Send, 
  Terminal, ShieldCheck, HeartHandshake, Zap, UserCheck, Layers, Layers3
} from 'lucide-react';

export default function CareersPage({ onOpenConsultation }) {
  const [selectedRoleModal, setSelectedRoleModal] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    roleId: 'general',
    experience: 'Fresher / Entry Level',
    portfolioUrl: '',
    shortMessage: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const domainIconMap = {
    Cpu,
    Database,
    Stethoscope,
    Building2,
    Box,
    Globe
  };

  const handleRoleSelect = (roleId) => {
    setFormData((prev) => ({ ...prev, roleId }));
    setSelectedRoleModal(null);
    const formElem = document.getElementById('apply-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validExtensions = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop().toLowerCase();
    
    if (!validExtensions.includes(ext)) {
      setFormError('Please upload a PDF, DOC, or DOCX resume file.');
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Resume file size must be less than 5MB.');
      setResumeFile(null);
      return;
    }

    setFormError('');
    setResumeFile(file);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!resumeFile) {
      setFormError('Please attach your resume file (PDF, DOC, or DOCX).');
      return;
    }

    setFormError('');
    setFormSuccess(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[var(--color-bg-primary)] transition-colors duration-200">
      <SEOHead 
        title="Careers at ServonTech | Build Digital Systems That Matter" 
        description="Explore career opportunities at ServonTech and work on practical software, AI-powered systems, automation and digital products for real businesses."
      />

      {/* WHY WE EXIST SECTION */}
      <section className="py-16 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)]">
              WHY WE EXIST
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)]">
              Simpler, Faster, Connected Software.
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              "Businesses shouldn't need complicated technology to move forward. We build digital systems that make their operations simpler, faster and more connected."
            </p>
          </div>

          {/* Visual Transformation Chain */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="glass-card p-6 rounded-2xl border border-[var(--color-card-problem-border)] bg-[var(--color-card-problem-bg)] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[var(--color-card-problem-text)] uppercase tracking-wider">STEP 1</span>
              <h3 className="text-base font-bold text-[var(--color-card-problem-text)]">BUSINESS PROBLEM</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">Manual entry, phone bottlenecks & lost leads</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-brand-light)] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[var(--color-brand)] uppercase tracking-wider">STEP 2</span>
              <h3 className="text-base font-bold text-[var(--color-brand)]">DIGITAL SYSTEM</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">Custom software, AI bots & 24/7 web booking</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-[var(--color-card-solution-border)] bg-[var(--color-card-solution-bg)] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[var(--color-card-solution-text)] uppercase tracking-wider">STEP 3</span>
              <h3 className="text-base font-bold text-[var(--color-card-solution-text)]">BETTER OPERATION</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">Seamless customer experience & business growth</p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* WHAT YOU'LL BUILD SECTION */}
      <section className="py-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)]">
              PRODUCT DOMAINS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)]">
              What Could You Work On?
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">
              Explore the core digital domains and software systems engineered at ServonTech.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORK_DOMAINS.map((domain) => {
              const IconComp = domainIconMap[domain.icon] || Globe;
              return (
                <div 
                  key={domain.num}
                  className="glass-card p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all duration-300 space-y-4 group shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[var(--color-text-muted)]">
                      {domain.num}
                    </span>
                    <div className="p-3 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)] border border-[var(--color-border)] group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                    {domain.title}
                  </h3>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </RevealOnScroll>
      </section>

      {/* WHAT WE VALUE */}
      <section className="py-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)]">
              OUR VALUES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)]">
              What We Value
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">
              Practical principles that guide how we engineer software and collaborate every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGINEERING_VALUES.map((val) => (
              <div 
                key={val.num}
                className="glass-card p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all space-y-3 shadow-sm"
              >
                <span className="text-xs font-mono font-bold text-[var(--color-brand)]">{val.num}</span>
                <h3 className="text-base font-bold text-[var(--color-text-primary)] tracking-tight">{val.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

        </RevealOnScroll>
      </section>

      {/* OPEN POSITIONS (TEMPORARILY COMMENTED OUT)
      <section id="open-positions" className="py-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)]">
              JOIN THE TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)]">
              Open Positions
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">
              Explore active engineering and design roles. Click any role to review details and apply.
            </p>
          </div>

          <div className="space-y-4">
            {CAREERS_ROLES.map((role) => (
              <div 
                key={role.id}
                className="glass-card p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                      {role.title}
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--color-brand)] bg-[var(--color-brand-light)] px-2.5 py-0.5 rounded border border-[var(--color-border)] font-semibold">
                      {role.location}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
                    {role.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-surface-hover)] px-2 py-0.5 rounded border border-[var(--color-border-subtle)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => setSelectedRoleModal(role)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] group-hover:bg-[var(--color-brand)] text-[var(--color-text-primary)] group-hover:text-white text-xs font-bold transition-all border border-[var(--color-border)] group-hover:border-[var(--color-brand)] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Role</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[var(--color-border)] text-center space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Don't See Your Role?</h3>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed">
              We're always interested in people who can solve problems, learn quickly and build useful things.
            </p>
            <a
              href="#apply-form"
              onClick={() => handleRoleSelect('general')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs shadow-md cursor-pointer"
            >
              <span>Send Your Profile →</span>
            </a>
          </div>

        </RevealOnScroll>
      </section>
      */}

      {/* JOB DETAIL EXPANDABLE MODAL */}
      {selectedRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <button 
              onClick={() => setSelectedRoleModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase">
                {selectedRoleModal.department} · {selectedRoleModal.location}
              </span>
              <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)]">
                {selectedRoleModal.title}
              </h2>
              <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)] pt-1">
                <span className="bg-[var(--color-surface-hover)] px-2.5 py-1 rounded border border-[var(--color-border)]">
                  Type: {selectedRoleModal.employmentType}
                </span>
                <span className="bg-[var(--color-surface-hover)] px-2.5 py-1 rounded border border-[var(--color-border)]">
                  Experience: {selectedRoleModal.experience}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[var(--color-text-secondary)]">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">Role Summary</h3>
                <p className="leading-relaxed">{selectedRoleModal.summary}</p>
              </div>

              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-2">What You'll Do</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedRoleModal.whatYoullDo.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-2">What We're Looking For</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedRoleModal.requirements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {selectedRoleModal.niceToHave && (
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-2">Nice to Have</h3>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {selectedRoleModal.niceToHave.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">What You'll Build</h3>
                <p className="font-semibold text-[var(--color-brand)]">{selectedRoleModal.whatYoullBuild}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] flex gap-3">
              <button
                onClick={() => handleRoleSelect(selectedRoleModal.id)}
                className="w-full py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Apply for this Role →</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* APPLICATION FORM SECTION */}
      <section id="apply-form" className="py-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)]">
              APPLICATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)]">
              Send Your Profile
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">
              Tell us about your technical background and what you'd like to build with us.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-[var(--color-border)] shadow-xl">
            {formSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Application Received</h3>
                <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
                  Thanks for reaching out. We've received your profile and will review it.
                </p>
                <button
                  onClick={() => { setFormSuccess(false); setResumeFile(null); setFormData({ fullName: '', email: '', phone: '', roleId: 'general', experience: 'Fresher / Entry Level', portfolioUrl: '', shortMessage: '' }); }}
                  className="px-6 py-2.5 rounded-xl bg-[var(--color-surface-hover)] text-xs font-bold text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                
                {formError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                      Role Interested In
                    </label>
                    <select
                      value={formData.roleId}
                      onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                    >
                      <option value="general">General Application / Open Role</option>
                      {CAREERS_ROLES.map((r) => (
                        <option key={r.id} value={r.id}>{r.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                      Experience Level
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                    >
                      <option value="Fresher / Entry Level">Fresher / Entry Level</option>
                      <option value="1–2 Years">1–2 Years</option>
                      <option value="3–5 Years">3–5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                      Portfolio / GitHub / LinkedIn
                    </label>
                    <input 
                      type="url" 
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[var(--color-text-primary)] block">
                    Resume Upload (PDF, DOC, DOCX - Max 5MB) *
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-brand)] p-6 rounded-2xl text-center bg-[var(--color-surface)] cursor-pointer transition-colors"
                  >
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <Upload className="w-6 h-6 text-[var(--color-brand)] mx-auto mb-2" />
                    {resumeFile ? (
                      <div className="text-xs font-bold text-[var(--color-brand)]">
                        Attached: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-[var(--color-text-primary)] block">
                          Click to select your resume file
                        </span>
                        <span className="text-[11px] text-[var(--color-text-muted)] block">
                          PDF, DOC, DOCX up to 5MB
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                    What would you like to build with us?
                  </label>
                  <textarea 
                    rows={3}
                    value={formData.shortMessage}
                    onChange={(e) => setFormData({ ...formData, shortMessage: e.target.value })}
                    placeholder="Briefly describe your technical background or practical projects you've built..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>

              </form>
            )}
          </div>

        </RevealOnScroll>
      </section>

      {/* HUMAN & AI-FIRST CULTURE SECTION */}
      <section className="py-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            <div className="glass-card p-8 rounded-3xl border border-[var(--color-border)] space-y-4 shadow-xl">
              <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider">
                AUTHENTIC CULTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">
                Small Team. Real Problems. Meaningful Work.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                "We're building ServonTech around practical technology — solving real operational problems instead of building software for the sake of software."
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[var(--color-text-muted)]">
                <span className="px-3 py-1 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)]">Direct Code Impact</span>
                <span className="px-3 py-1 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)]">Zero Red Tape</span>
                <span className="px-3 py-1 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)]">Practical Architecture</span>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-[var(--color-border)] space-y-4 shadow-xl">
              <span className="text-xs font-mono text-[var(--color-accent-lime)] font-extrabold uppercase tracking-wider">
                PRAGMATIC INNOVATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">
                Build With AI. Think Beyond AI.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                "We use AI to accelerate research, development, automation and experimentation — while keeping engineering judgment at the center."
              </p>
              <div className="p-4 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-brand)] font-bold">
                DEVELOPER + AI + AUTOMATION = WORKING PRODUCT
              </div>
            </div>

          </div>

        </RevealOnScroll>
      </section>

      {/* TECH STACK ECOSYSTEM */}
      <section className="py-16 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider">
              TECHNOLOGY ECOSYSTEM
            </span>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Core Stack We Work With
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {TECH_STACK_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                className="px-4 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-primary)] flex items-center gap-2 shadow-sm"
              >
                <Code2 className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                <span className="font-bold">{item.name}</span>
                <span className="text-[10px] text-[var(--color-text-muted)]">({item.category})</span>
              </div>
            ))}
          </div>

        </RevealOnScroll>
      </section>

      {/* CAREER GROWTH ROADMAP */}
      <section className="py-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[var(--color-brand)] font-extrabold uppercase tracking-wider bg-[var(--color-brand-light)] px-3.5 py-1.5 rounded-full border border-[var(--color-border)]">
              YOUR GROWTH HERE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)]">
              From Curiosity to Engineering Leadership
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">
              "You don't need to know everything on day one. You need the curiosity to keep improving."
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CAREER_GROWTH_STEPS.map((st) => (
              <div 
                key={st.step}
                className="glass-card p-5 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all space-y-2"
              >
                <span className="text-xs font-mono font-bold text-[var(--color-brand)]">{st.step}</span>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">{st.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

        </RevealOnScroll>
      </section>

    </div>
  );
}
