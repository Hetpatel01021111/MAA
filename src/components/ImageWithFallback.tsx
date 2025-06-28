'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
  sizes,
  quality = 75,
  style,
  fallbackSrc = 'https://via.placeholder.com/800x600/e5e7eb/6b7280?text=Image+Not+Available'
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageProps = {
    src: imgSrc,
    alt,
    onError: handleError,
    onLoad: handleLoad,
    className: `${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    priority,
    sizes,
    quality,
    style,
    ...(fill ? { fill: true } : { width, height })
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${fill ? '' : `w-[${width}px] h-[${height}px]`}`} />
      )}
      <Image {...imageProps} />
      {hasError && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Fallback
        </div>
      )}
    </div>
  );
}