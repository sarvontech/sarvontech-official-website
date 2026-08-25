import { useEffect } from 'react';

export default function SEOHead({ title, description, keywords, canonical }) {
  useEffect(() => {
    // Title
    const defaultTitle = "Sarvon Tech — Digital Solutions & Custom Software";
    document.title = title ? `${title} | Sarvon Tech` : defaultTitle;

    // Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || "Sarvon Tech builds custom business websites, software systems, School ERP platforms, and AI automation tailored to your business.");
    }

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const defaultKeywords = "School ERP, School Management Software, Educational ERP System, Custom Software Development, Digital Solutions, AI Workflow Automation, School Administration System, Fee Collection Software, Student Information System, Sarvon Tech";
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || defaultKeywords);

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const currentPath = window.location.pathname === '/' ? '' : window.location.pathname;
    canonicalLink.setAttribute('href', canonical || `https://www.sarvontech.in${currentPath}`);

    // Scroll to top on page navigation
    window.scrollTo(0, 0);
  }, [title, description, keywords, canonical]);

  return null;
}
