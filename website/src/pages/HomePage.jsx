import React from 'react';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import SolutionsGrid from '../components/SolutionsGrid';
import ProductsShowcase from '../components/ProductsShowcase';
import SelectedWorkSlider from '../components/SelectedWorkSlider';
import IndustryVerticals from '../components/IndustryVerticals';
import WhyServonTech from '../components/WhyServonTech';
import HowWeWork from '../components/HowWeWork';
import ConsultationCTA from '../components/ConsultationCTA';

export default function HomePage({ onOpenConsultation }) {
  return (
    <>
      <SEOHead 
        title="Digital Solutions & Custom Software Company"
        description="Sarvon Tech turns business problems into high-converting digital solutions, custom software systems, and practical AI automation."
      />

      {/* 1. Concise Hero */}
      <Hero onOpenConsultation={onOpenConsultation} />

      {/* 2. What We Do (3 Core Categories Slider) */}
      <SolutionsGrid onOpenConsultation={onOpenConsultation} />

      {/* 3. Products We Are Building */}
      <ProductsShowcase onOpenConsultation={onOpenConsultation} />

      {/* 4. Selected Work (Single-Line Auto Slider) */}
      <SelectedWorkSlider />

      {/* 5. Industries (Including Spiritual & Community) */}
      <IndustryVerticals onOpenConsultation={onOpenConsultation} />

      {/* 6. Why ServonTech */}
      <WhyServonTech />

      {/* 7. How We Work (Simple 5-Step Process) */}
      <HowWeWork onOpenConsultation={onOpenConsultation} />

      {/* 8. Single Final Closing CTA */}
      <ConsultationCTA onOpenConsultation={onOpenConsultation} />
    </>
  );
}
