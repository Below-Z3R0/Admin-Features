'use client'

import { useEffect, useState } from "react";

export function useIsOpen(key: string = 'isOpen', defaultValue: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(saved === 'true');
      }
    } catch (error) {
      console.warn(`Error leyendo localStorage en la clave "${key}":`, error);
    }
  }, [key]);


  useEffect(() => {
    localStorage.setItem(key, String(isOpen));
  }, [isOpen, key]);

  const Toggle = () => setIsOpen(prev => !prev);

  return { isOpen, Toggle };
}
