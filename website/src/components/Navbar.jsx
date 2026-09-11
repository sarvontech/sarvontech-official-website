import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Layers, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getLiveNavigationLinks } from '../lib/supabase';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async function fetchNav() {
      const links = await getLiveNavigationLinks();
      if (links) {
        setNavLinks(links);
      } else {
        // Fallback static links if db is offline or empty
        setNavLinks([
          { id: '1', label: 'Home', url: '/', order_index: 0 },
          { id: '2', label: 'Solutions', url: '/solutions', order_index: 1 },
          { id: '3', label: 'Services', url: '/services', order_index: 2 },
          { id: '4', label: 'Products', url: '/products', order_index: 3 },
          { id: '5', label: 'Industries', url: '/industries', order_index: 4 },
          { id: '6', label: 'Projects', url: '/projects', order_index: 5 },
          { id: '7', label: 'Careers', url: '/careers', order_index: 6 },
          { id: '8', label: 'About', url: '/about', order_index: 7 },
        ]);
      }
    }
    fetchNav();
  }, []);

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
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[var(--color-brand)] to-[var(--color-accent-mint)] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-[10px] flex items-center justify-center overflow-hidden p-0.5">
                <img src="/assets/images/logo-remove-bg.png" alt="Sarvon Tech Logo" className="w-full h-full object-contain" />
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
            {navLinks.filter(l => !l.parent_id).map((link) => {
              const children = navLinks.filter(child => child.parent_id === link.id);
              const hasChildren = children.length > 0;
              
              if (hasChildren) {
                return (
                  <div key={link.id} className="relative group">
                    <button 
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                        location.pathname.startsWith(link.url) && link.url !== '/'
                          ? 'text-[var(--color-brand)] font-semibold' 
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                      }`}
                    >
                      {link.label}
                      <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-1 w-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-2 flex flex-col gap-1">
                        {/* Parent link itself as an option if it has a valid URL */}
                        {link.url && link.url !== '#' && (
                          <Link 
                            to={link.url}
                            target={link.open_in_new_tab ? "_blank" : undefined}
                            rel={link.open_in_new_tab ? "noopener noreferrer" : undefined}
                            className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              isActive(link.url)
                                ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                            }`}
                          >
                            Overview
                          </Link>
                        )}
                        {children.map(child => {
                          const subChildren = navLinks.filter(sub => sub.parent_id === child.id).sort((a,b) => a.order_index - b.order_index);
                          
                          if (subChildren.length > 0) {
                            return (
                              <div key={child.id} className="relative group/sub">
                                <div className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                                  isActive(child.url) || subChildren.some(s => isActive(s.url))
                                    ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                                }`}>
                                  {child.url ? (
                                    <Link to={child.url} target={child.open_in_new_tab ? "_blank" : undefined} rel={child.open_in_new_tab ? "noopener noreferrer" : undefined}>
                                      {child.label}
                                    </Link>
                                  ) : (
                                    <span>{child.label}</span>
                                  )}
                                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>

                                {/* 3rd Level Flyout */}
                                <div className="absolute left-full top-0 ml-1 w-48 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                                  <div className="p-2 flex flex-col gap-1">
                                    {subChildren.map(subChild => (
                                      <Link 
                                        key={subChild.id}
                                        to={subChild.url}
                                        target={subChild.open_in_new_tab ? "_blank" : undefined}
                                        rel={subChild.open_in_new_tab ? "noopener noreferrer" : undefined}
                                        className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                          isActive(subChild.url)
                                            ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                                        }`}
                                      >
                                        {subChild.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <Link 
                              key={child.id}
                              to={child.url}
                              target={child.open_in_new_tab ? "_blank" : undefined}
                              rel={child.open_in_new_tab ? "noopener noreferrer" : undefined}
                              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                isActive(child.url)
                                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link 
                  key={link.id}
                  to={link.url} 
                  target={link.open_in_new_tab ? "_blank" : undefined}
                  rel={link.open_in_new_tab ? "noopener noreferrer" : undefined}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.url) 
                      ? 'text-[var(--color-brand)] bg-[var(--color-brand-light)] font-semibold' 
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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
            {navLinks.filter(l => !l.parent_id).map((link) => {
              const children = navLinks.filter(child => child.parent_id === link.id);
              const hasChildren = children.length > 0;

              return (
                <div key={link.id}>
                  <Link 
                    to={link.url || '#'} 
                    target={link.open_in_new_tab ? "_blank" : undefined}
                    rel={link.open_in_new_tab ? "noopener noreferrer" : undefined}
                    onClick={!hasChildren ? () => setMobileMenuOpen(false) : undefined} 
                    className={`block px-3 py-2 text-sm rounded-lg ${
                      isActive(link.url) && link.url !== '/' 
                        ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' 
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {hasChildren && (
                    <div className="pl-4 mt-1 border-l-2 border-[var(--color-border)] ml-3 space-y-1">
                      {children.map(child => {
                        const subChildren = navLinks.filter(sub => sub.parent_id === child.id).sort((a,b) => a.order_index - b.order_index);
                        const hasSub = subChildren.length > 0;
                        
                        return (
                          <div key={child.id}>
                            <Link 
                              to={child.url || '#'} 
                              target={child.open_in_new_tab ? "_blank" : undefined}
                              rel={child.open_in_new_tab ? "noopener noreferrer" : undefined}
                              onClick={!hasSub ? () => setMobileMenuOpen(false) : undefined} 
                              className={`block px-3 py-2 text-sm rounded-lg ${
                                isActive(child.url) 
                                  ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' 
                                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                              }`}
                            >
                              {child.label}
                            </Link>
                            
                            {hasSub && (
                              <div className="pl-4 mt-1 border-l-2 border-[var(--color-border)] ml-3 space-y-1">
                                {subChildren.map(subChild => (
                                  <Link 
                                    key={subChild.id}
                                    to={subChild.url} 
                                    target={subChild.open_in_new_tab ? "_blank" : undefined}
                                    rel={subChild.open_in_new_tab ? "noopener noreferrer" : undefined}
                                    onClick={() => setMobileMenuOpen(false)} 
                                    className={`block px-3 py-2 text-[13px] rounded-lg ${
                                      isActive(subChild.url) 
                                        ? 'text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)]' 
                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                    }`}
                                  >
                                    {subChild.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
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
