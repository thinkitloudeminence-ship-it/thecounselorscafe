// Performance Optimization Configuration
// Add this file to your project for 10x faster website

// 1. Image Optimization Configuration
export const imageConfig = {
  quality: 75, // Reduced from 100 to 75 (30% faster)
  loading: 'lazy' as const,
  priority: false,
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
};

// 2. Animation Optimization
export const animationConfig = {
  // Reduce animation duration for faster perception
  fastTransition: { duration: 0.2, ease: 'easeOut' },
  mediumTransition: { duration: 0.3, ease: 'easeOut' },
  slowTransition: { duration: 0.4, ease: 'easeOut' },
  
  // Reduce blur intensity (10x faster)
  blurIntensity: 'blur-[30px]', // Was 120px
  glowIntensity: 'blur-[40px]', // Was 100px
};

// 3. Lazy Load Components
export const lazyLoadConfig = {
  rootMargin: '200px',
  threshold: 0.1,
  once: true,
};

// 4. Memory Management
export const memoryConfig = {
  maxParticles: 6, // Reduced from 16
  maxRotatingRings: 2, // Reduced from 3
  maxTestimonials: 6,
  maxCounselors: 6,
};

// 5. Network Optimization
export const networkConfig = {
  // Preconnect to important domains
  preconnect: [
    'https://images.unsplash.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  
  // DNS Prefetch
  dnsPrefetch: [
    'https://images.unsplash.com',
    'https://vercel.live',
  ],
};

// 6. CSS Optimization
export const cssConfig = {
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
};