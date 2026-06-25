// ============================================
// EditableArrayItem (MOLÉCULA)
// ============================================
// Un item sortable de @dnd-kit/sortable. Renderiza el contenido (vía
// renderItem) más un handle de drag (GripVertical) y un botón de eliminar
// (Trash2). El handle solo aparece en hover, no estorba la edición.
//
// Este componente es interno al EditableArray (no se exporta solo). Lo
// separamos en su propio archivo por claridad, pero vive dentro de la
// misma carpeta "molecules".
//
// Props:
//   - id       - Identificador único del item (lo da EditableArray)
//   - onRemove - Callback para eliminar este item
//   - children - El contenido editable (viene de renderItem del padre)

'use client';

import { GripVertical, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EditableArrayItemProps {
  id: string;
  onRemove: () => void;
  children: React.ReactNode;
}

export function EditableArrayItem({
  id,
  onRemove,
  children,
}: EditableArrayItemProps) {
  // useSortable provee los handlers y transformaciones para que el item
  // se pueda arrastrar. Devuelve:
  //   - attributes: aria-*, role, tabIndex (a11y)
  //   - listeners: onMouseDown, onKeyDown, etc. (eventos de drag)
  //   - setNodeRef: ref al elemento DOM del item
  //   - transform: { x, y, scaleX, scaleY } que indica cuánto se movió
  //   - transition: CSS transition (suaviza el movimiento)
  //   - isDragging: true mientras se arrastra
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // CSS.Transform.toString convierte el transform a un string CSS válido
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // feedback visual mientras se arrastra
  };

  return (
    // El div recibe la ref y el style. role="listitem" para a11y.
    <div
      ref={setNodeRef}
      style={style}
      role="listitem"
      className="relative group rounded-md border border-dashed border-accent/30 bg-card/40 p-3"
    >
      {/* Botones de acción (drag + delete). Aparecen en hover para no estorbar */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {/* Botón de drag (GripVertical) — recibe los listeners de dnd-kit */}
        <button
          type="button"
          aria-label="Mover (arrastrar para reordenar)"
          {...attributes}
          {...listeners}
          className="p-1.5 rounded hover:bg-hover cursor-grab active:cursor-grabbing text-muted hover:text-main"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Botón de eliminar */}
        <button
          type="button"
          aria-label="Eliminar este item"
          onClick={onRemove}
          className="p-1.5 rounded hover:bg-warning/20 text-warning"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Contenido editable (lo que pasa el padre vía children/renderItem) */}
      <div className="pr-16">{children}</div>
    </div>
  );
}
