// ============================================
// EditableText (ÁTOMO del modo edición)
// ============================================
// Este es el componente base de toda la UI de edición. Renderiza un
// <input> o <textarea> controlado, con un borde DASHED para indicar
// visualmente que es editable.
//
// Visualmente, el placeholder se muestra SOLO cuando el value es vacío.
// Esto es importante porque un admin debe ver claramente qué campo
// está vacío en la BD vs qué campo tiene contenido.
//
// FIX DE TAMAÑO: usamos `appearance-none` para resetear los estilos
// nativos del navegador (especialmente el `font-size: 16px` default
// de los inputs en iOS) y `text-base` como tamaño mínimo por defecto.
// Las className que pasa el padre (e.g. `text-4xl`) sobrescriben esto.
//
// Props (ver types.ts):
//   - value, onChange, placeholder, multiline, type, className, ariaLabel, maxLength
//
// Uso:
//
//   <EditableText
//     value={draft.title}
//     onChange={(v) => setDraft({ ...draft, title: v })}
//     placeholder="Título principal"
//     className="text-4xl font-bold"
//   />

'use client';

import { useId } from 'react';
import type { EditableTextProps } from '../types';

export function EditableText({
  value,
  onChange,
  placeholder,
  multiline = false,
  type = 'text',
  className = '',
  ariaLabel,
  maxLength,
}: EditableTextProps) {
  // useId genera un id único para asociación label/input (a11y)
  const id = useId();

  // Clases base compartidas por input y textarea.
  //
  // NOTAS IMPORTANTES:
  // - `appearance-none`: resetea estilos nativos (Safari/iOS hacen
  //   zoom en inputs con font-size < 16px; esto lo previene)
  // - `text-base`: tamaño mínimo por defecto. Si pasas `className`
  //   con `text-xs`, `text-4xl`, etc., se sobrescribe (Tailwind).
  // - `font-sans`: usa la tipografía global (Outfit) del proyecto.
  // - `text-main`: hereda el color principal del theme.
  // - `placeholder:text-muted`: estilo del placeholder cuando está vacío.
  // - `border-dashed`: comunica visualmente "esto es editable".
  const baseClasses = [
    'w-full',
    'bg-transparent',
    'appearance-none',
    'border',
    'border-dashed',
    'border-accent/40',
    'rounded',
    'px-3',
    'py-2',
    'outline-none',
    'focus:border-accent',
    'focus:bg-card/40',
    'transition-colors',
    'font-sans',
    'text-main',
    'text-base',
    'placeholder:text-muted',
    'placeholder:font-normal',
  ].join(' ');

  // Si es multiline, renderiza un <textarea>
  if (multiline) {
    return (
      <textarea
        id={id}
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        // rows auto-ajustado: mínimo 2, máximo 8, según saltos de línea
        rows={Math.min(8, Math.max(2, value.split('\n').length))}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseClasses} resize-y leading-relaxed ${className}`}
      />
    );
  }

  // Default: <input> de una línea
  return (
    <input
      id={id}
      aria-label={ariaLabel}
      type={type}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseClasses} ${className}`}
    />
  );
}
