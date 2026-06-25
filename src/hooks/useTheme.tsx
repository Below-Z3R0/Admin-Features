'use client';

import { useEffect, useState, startTransition } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(saved);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    startTransition(() => {
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
      root.style.colorScheme = theme;
    });
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  return { theme, setTheme };
}
