"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface ViewportLoaderProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

/**
 * ViewportLoader component that only renders children when they come into view
 * This helps reduce initial bundle size by deferring heavy component renders
 */
const ViewportLoader: React.FC<ViewportLoaderProps> = ({
  children,
  threshold = 0.1,
  rootMargin = "100px",
  fallback = (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-2xl" />
  ),
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsInView(true);
          setHasLoaded(true);
          // Once loaded, disconnect observer to avoid unnecessary checks
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref} className="w-full">
      {isInView ? children : fallback}
    </div>
  );
};

export default ViewportLoader;
