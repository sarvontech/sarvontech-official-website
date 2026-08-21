import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ 
  children, 
  className = '', 
  delay = 0,
  staggerChildren = false,
  staggerDelay = 70
}) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setIsAnimationFinished(true);
      return;
    }

    const currentRef = domRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect observer once revealed to save CPU/GPU resources
          observer.disconnect();

          // Set animation finished flag after transition completes
          const timer = setTimeout(() => {
            setIsAnimationFinished(true);
          }, 700 + delay);
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [delay]);

  // Clean inline styles once animation is finished to prevent continuous rendering overhead
  const getStyle = () => {
    if (isAnimationFinished) {
      return {};
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.985)',
      transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: isVisible ? 'opacity, transform' : 'auto'
    };
  };

  return (
    <div 
      ref={domRef} 
      className={`transition-none ${className}`}
      style={getStyle()}
    >
      {children}
    </div>
  );
}
