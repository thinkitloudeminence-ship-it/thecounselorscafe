'use client';
import { useEffect } from 'react';
import { imageConfig, memoryConfig, animationConfig } from '@/lib/performance';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // 1. Disable heavy animations on low-end devices
    const isLowEndDevice = () => {
      const memory = (navigator as any).deviceMemory;
      const cores = navigator.hardwareConcurrency;
      return (memory && memory < 4) || (cores && cores < 4);
    };

    if (isLowEndDevice()) {
      document.body.classList.add('reduce-motion');
      document.body.classList.add('low-end-device');
    }

    // 2. Detect WebGL support
    const hasWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    };

    if (!hasWebGL()) {
      document.body.classList.add('no-webgl');
    }

    // 3. Lazy load offscreen images
    const lazyLoadImages = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.dataset.src;
              if (src) {
                img.src = src;
                img.removeAttribute('data-src');
              }
              imageObserver.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach((img) => {
          imageObserver.observe(img);
        });
      }
    };

    lazyLoadImages();

    // 4. Debounce scroll events
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Your scroll logic here
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // 5. Optimize framerate for animations
    let frameId: number;
    let lastTime = 0;
    const fps = 30; // Limit to 30fps for heavy animations
    const interval = 1000 / fps;

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      if (time - lastTime < interval) return;
      lastTime = time;
      // Update animations here
    };

    frameId = requestAnimationFrame(animate);

    // 6. Clear memory on page hide
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page hidden - reduce activity
        document.body.classList.add('page-hidden');
      } else {
        document.body.classList.remove('page-hidden');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 7. Prefetch links on hover
    const prefetchLinks = () => {
      let timeout: NodeJS.Timeout;
      document.querySelectorAll('a').forEach((link) => {
        link.addEventListener('mouseenter', () => {
          timeout = setTimeout(() => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http')) {
              // Prefetch logic
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = href;
              document.head.appendChild(link);
            }
          }, 100);
        });
        link.addEventListener('mouseleave', () => {
          clearTimeout(timeout);
        });
      });
    };

    prefetchLinks();

    // 8. Optimize heavy CSS properties
    const optimizeCSS = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Reduce blur on low-end devices */
        .low-end-device .blur-2xl,
        .low-end-device [class*="blur-"] {
          filter: blur(10px) !important;
        }
        
        /* Disable heavy animations on low-end */
        .low-end-device .animate-pulse-slow,
        .low-end-device [class*="animate-"] {
          animation-duration: 0s !important;
          animation: none !important;
          transition: none !important;
        }
        
        /* Optimize transforms */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }
        
        /* Reduce paint time */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Optimize images */
        img {
          content-visibility: auto;
        }
      `;
      document.head.appendChild(style);
    };

    optimizeCSS();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}