import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Mail, Phone } from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  return (
    <footer className="bg-[var(--color-bg-footer)] text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-16 pb-12 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--color-border)]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[var(--color-brand)] to-[var(--color-accent-mint)] p-0.5 shadow-md">
                <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-[10px] flex items-center justify-center overflow-hidden p-0.5">
                  <img src="/assets/images/logo-remove-bg.png" alt="Sarvon Tech Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] font-sans">
                SARVON<span className="text-[var(--color-brand)]"> TECH</span>
              </span>
            </Link>

            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
              Digital Solutions Company + Software Product Developer + AI Automation Partner. We build business websites, custom software systems, and practical AI workflows.
            </p>

            <div className="text-xs space-y-1.5 pt-2">
              <a href="mailto:sarvon.tech@gmail.com" className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
                <Mail className="w-4 h-4 text-[var(--color-brand)]" />
                <span>sarvon.tech@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Phone className="w-4 h-4 text-[var(--color-accent-mint)]" />
                <span>+91 98348 57370</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li><Link to="/solutions" className="hover:text-[var(--color-brand)] transition-colors">Digital Presence & Websites</Link></li>
              <li><Link to="/solutions" className="hover:text-[var(--color-brand)] transition-colors">Custom Business Software</Link></li>
              <li><Link to="/solutions" className="hover:text-[var(--color-brand)] transition-colors">AI & Workflow Automation</Link></li>
              <li><Link to="/solutions" className="hover:text-[var(--color-brand)] transition-colors">CRM & Lead Management</Link></li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
              Sarvon Tech Labs
            </h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-[var(--color-brand)] transition-colors">Real Estate Sales CRM</Link></li>
              <li><Link to="/products" className="hover:text-[var(--color-brand)] transition-colors">Smart Booking System</Link></li>
              <li><Link to="/products" className="hover:text-[var(--color-brand)] transition-colors">Multi-Store Inventory Suite</Link></li>
              <li><Link to="/products" className="hover:text-[var(--color-brand)] transition-colors">AI WhatsApp Bot Engine</Link></li>
            </ul>
          </div>

          {/* Navigation & Projects */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
              Company & Work
            </h4>
            <ul className="space-y-2">
              <li><Link to="/projects" className="hover:text-[var(--color-brand)] transition-colors">Selected Work & Case Studies</Link></li>
              <li><Link to="/industries" className="hover:text-[var(--color-brand)] transition-colors">Industries We Serve</Link></li>
              <li><Link to="/careers" className="hover:text-[var(--color-brand)] transition-colors">Careers & Hiring</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-brand)] transition-colors">About Sarvon Tech</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-brand)] transition-colors">Contact & Let's Talk</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] gap-4 font-mono">
          <div>
            © {new Date().getFullYear()} Sarvon Tech Digital Solutions & Products. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/careers" className="hover:text-[var(--color-brand)] transition-colors">Careers</Link>
            <Link to="/about" className="hover:text-[var(--color-brand)] transition-colors">Philosophy</Link>
            <Link to="/contact" className="hover:text-[var(--color-brand)] transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
