import React, { useEffect, useState, useRef } from 'react';
interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'scale-up' | 'scale-down' | 'rotate' | 'bounce';
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}
const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = 'fade-in',
  duration = 0.1,
  delay = 0,
  threshold = 0.01,
  once = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => setIsVisible(true));
        } else {
          requestAnimationFrame(() => setIsVisible(true));
        }
        if (once && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    }, {
      threshold,
      rootMargin: '0px 0px -10% 0px' // starts earlier
    });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => currentRef && observer.unobserve(currentRef);
  }, [once, threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'animate-fadeIn';
      case 'fade-up': return 'animate-fadeInUp';
      case 'fade-down': return 'animate-fadeInDown';
      case 'fade-left': return 'animate-fadeInLeft';
      case 'fade-right': return 'animate-fadeInRight';
      case 'zoom-in': return 'animate-zoomIn';
      case 'zoom-out': return 'animate-zoomOut';
      case 'scale-up': return 'animate-scaleIn';
      case 'scale-down': return 'animate-scaleDown';
      case 'rotate': return 'animate-rotate';
      case 'bounce': return 'animate-bounce';
      default: return 'animate-fadeIn';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? getAnimationClass() : 'opacity-0'}`}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;