'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface A11yContextType {
  seniorMode: boolean;
  setSeniorMode: (enabled: boolean) => void;
  reducedMotion: boolean;
}

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export function A11yProvider({ children }: { children: ReactNode }) {
  const [seniorMode, setSeniorModeState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Load senior mode from localStorage
    const saved = localStorage.getItem('picklebay_senior_mode');
    if (saved === 'true') {
      setSeniorModeState(true);
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply senior mode to document
    document.documentElement.classList.toggle('senior', seniorMode);
  }, [seniorMode]);

  const setSeniorMode = (enabled: boolean) => {
    setSeniorModeState(enabled);
    localStorage.setItem('picklebay_senior_mode', enabled.toString());
  };

  return (
    <A11yContext.Provider value={{ seniorMode, setSeniorMode, reducedMotion }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const context = useContext(A11yContext);
  if (!context) {
    throw new Error('useA11y must be used within A11yProvider');
  }
  return context;
}

// Legacy shim
export function useAccessibility() {
  return useA11y();
}