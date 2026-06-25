'use client'
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { AnimationProps, MiniTitleProps } from '../types';
// Curva de transicion personalizada para un estilo elegante
const ease = [0.25, 0.1, 0.25, 1];

export const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function useReveal(threshold = 0.1): [React.MutableRefObject<null>, boolean] {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/**
 * FadeUp: Animación estándar para bloques de texto y secciones.
 * Desplaza el elemento desde abajo hacia arriba con un desvanecimiento.
 */
export function FadeUp({ children, delay = 0, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Ey (Eyebrow): El pequeño indicador sobre los títulos.
 * Incluye una línea que se expande lateralmente.
 */
export function MiniTitleAnimation({ children }: MiniTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 28 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px w-5! bg-[#B08D57]"
      />
        {children}
    </div>
  );
}


export function ExpandLine() {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{ height: 1, background: "#E8E4DC", width: v ? "100%" : "0%", transition: `width 1.4s` }} />
  )
}

/**
 * AnimBar: Barra de progreso animada para el Track Record.
 */
export function AnimBar({ pct, delay = 0 }: { pct: number, delay?: number }) {
  return (
    <div className="w-full h-px bg-white/10 relative overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: pct / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-[#B08D57]"
      />
    </div>
  );
}

export const scrollToSection = (id: string) => {
  const getId = document.getElementById(id);
  if (getId) getId.scrollIntoView({ behavior: 'smooth' });
}

/**
 * StaggerContainer: Útil para listas donde quieres que los elementos
 * aparezcan uno tras otro (como en Ethics o Academy).
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
