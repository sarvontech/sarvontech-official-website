import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Layers, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--color-surface-glass)] backdrop-blur-md border-b border-[var(--color-border)] py-3 shadow-md' 
          : 'bg-[var(--color-surface-glass)] backdrop-blur-sm py-4 border-b border-[var(--color-border-subtle)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - Returns Home */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-brand)] to-[var(--color-accent-mint)] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-[var(--color-brand)]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] font-sans flex items-center gap-1.5">
                SARVON<span className="text-[var(--color-brand)] font-extrabold"> TECH</span>
              </span>
              <span className="text-[10px] tracking-wider text-[var(--color-text-muted)] uppercase font-mono">
                Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Home
            </Link>

            <Link 
              to="/solutions" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/solutions') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Solutions
            </Link>

            <Link 
              to="/services" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/services') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Services
            </Link>

            <Link 
              to="/products" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/products') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Products
            </Link>

            <Link 
              to="/industries" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/industries') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Industries
            </Link>

            <Link 
              to="/projects" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/projects') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Projects
            </Link>

            <Link 
              to="/careers" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/careers') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Careers
            </Link>

            <Link 
              to="/about" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/about') 
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Desktop Right Actions (Theme Switcher + Let's Talk CTA) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-all shadow-sm flex items-center justify-center cursor-pointer"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[var(--color-brand)]" />
              ) : (
                <Sun className="w-4 h-4 text-[var(--color-accent-lime)]" />
              )}
            </button>

            <button 
              onClick={() => onOpenConsultation()}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Actions (Theme Toggle + Menu Button) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[var(--color-brand)]" />
              ) : (
                <Sun className="w-5 h-5 text-[var(--color-accent-lime)]" />
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-[var(--color-border)] px-4 pt-4 pb-6 mt-3 space-y-3 animate-in slide-in-from-top duration-300">
          <div className="space-y-1">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              Home
            </Link>
            <Link to="/solutions" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/solutions') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              Solutions
            </Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/services') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              Services
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/products') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              Products
            </Link>
            <Link to="/industries" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/industries') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              Industries
            </Link>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/projects') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              Projects
            </Link>
            <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/careers') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              Careers
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isActive('/about') ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              About
            </Link>
          </div>

          <div className="pt-2 border-t border-[var(--color-border)] flex flex-col gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="w-full py-3 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
