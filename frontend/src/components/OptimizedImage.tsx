'use client';
import Image from 'next/image';
import { useState } from 'react';
import { imageConfig } from '@/lib/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill = false, 
  className = '',
  priority = false 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        quality={imageConfig.quality}
        loading={priority ? 'eager' : imageConfig.loading}
        priority={priority}
        sizes={imageConfig.sizes}
        onLoad={() => setIsLoaded(true)}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${fill ? 'object-cover' : ''}
        `}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse" />
      )}
    </div>
  );
}