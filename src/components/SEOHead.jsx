import { useEffect } from 'react';

export default function SEOHead({ title, description, canonical }) {
  useEffect(() => {
    // Title
    const defaultTitle = "Sarvon Tech — Digital Solutions & Custom Software";
    document.title = title ? `${title} | Sarvon Tech` : defaultTitle;

    // Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || "Sarvon Tech builds custom business websites, software systems, and AI automation tailored to your business.");
    }

    // Scroll to top on page navigation
    window.scrollTo(0, 0);
  }, [title, description, canonical]);

  return null;
}
