import { useCallback } from 'react';

// Custom hook for performance optimizations
export const usePerformanceOptimized = () => {
  // Memoized navigation handler to prevent unnecessary re-renders
  const createNavigationHandler = useCallback((section: string, onNavigate: (section: string) => void) => {
    return () => onNavigate(section);
  }, []);

  // Memoized section title getter
  const getSectionTitle = useCallback((section: string) => {
    const titleMap: { [key: string]: string } = {
      playground: "The Playground",
      projects: "The Projects", 
      person: "The Person",
      connect: "Connect Maybe?",
    };
    return titleMap[section] || "The Playground";
  }, []);

  // Memoized section mapping for Rive animations
  const getSectionValue = useCallback((section: string) => {
    const sectionMap: { [key: string]: number } = {
      playground: 0,
      projects: 1,
      person: 2,
      connect: 3,
    };
    return sectionMap[section] || 0;
  }, []);

  return {
    createNavigationHandler,
    getSectionTitle,
    getSectionValue,
  };
};
