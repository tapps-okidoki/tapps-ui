'use client';
import { useEffect, useState } from 'react';

export const useDeviceScreen = (screen: string) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${screen})`);

    const handleChange = () => setIsMobile(mediaQuery.matches);

    // Initial check
    handleChange();

    // Listen to changes
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [screen]);

  return isMobile;
};
