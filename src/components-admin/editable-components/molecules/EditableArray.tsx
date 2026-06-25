// ============================================
// EditableArray (MOLÉCULA con drag & drop)
// ============================================
// Wrapper sobre @dnd-kit/sortable que permite:
//
// 1. Listar items editables
// 2. Reordenarlos arrastrando (drag & drop)
// 3. Añadir nuevos items con un botón "+"
// 4. Eliminar items con el botón 🗑
//
// Los items pueden ser strings (caso más simple) o objetos (caso
// avanzado: cada item es un objeto con varios campos).
//
// Props (ver types.ts):
//   - items, onReorder, onAdd, onRemove, renderItem, addLabel, emptyHint
//
// Uso (caso strings):
//
//   <EditableArray
//     items={draft.brand.map((v, i) => ({ id: `b-${i}`, value: v }))}
//     onReorder={(next) => setDraft({ ...draft, brand: next as string[] }))}
//     onAdd={() => setDraft({ ...draft, brand: [...draft.brand, ''] }))}
//     onRemove={(id) => {
//       const i = parseInt(id.split('-')[1]);
//       setDraft({ ...draft, brand: draft.brand.filter((_, idx) => idx !== i) });
//     }}
//     renderItem={(value, i) => (
//       <EditableText value={value} onChange={(v) => {
//         const next = [...draft.brand];
//         next[i] = v;
//         setDraft({ ...draft, brand: next });
//       }} placeholder={`Item ${i + 1}`} />
//     )}
//   />

'use client';

import { Plus } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { EditableArrayItem } from './EditableArrayItem';
import type { EditableArrayProps } from '../types';

export function EditableArray<T>({
  items,
  onReorder,
  onAdd,
  onRemove,
  renderItem,
  addLabel = 'Añadir',
  emptyHint = 'Sin elementos. Pulsa "Añadir" para empezar.',
}: EditableArrayProps<T>) {
  // ============================================
  // SENSORES (cómo se activa el drag)
  // ============================================
  // PointerSensor: detecta clicks/toques del mouse. activationConstraint
  // con distance: 5 → el drag se activa solo si el mouse se mueve 5px.
  // Esto previene que un click simple (para enfocar un input) se
  // confunda con un drag.
  //
  // KeyboardSensor: permite arrastrar con teclado (a11y). Usa
  // sortableKeyboardCoordinates para mapear las flechas a coordenadas.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // ============================================
  // HANDLE DEL FIN DEL DRAG
  // ============================================
  // Se llama cuando el usuario SUELTA el item después de arrastrar.
  // active.id = el item que se estaba arrastrando
  // over.id   = el item sobre el que se soltó
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return; // no cambió de posición

    // Buscar los índices en el array actual
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    // arrayMove reordena el array (helper de @dnd-kit)
    const reordered = arrayMove(items, oldIndex, newIndex);

    // Devolvemos SOLO los values (sin los ids locales) al padre
    const nextValues = reordered.map((item) => item.value);
    onReorder(nextValues);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* role="list" para a11y */}
        <div className="flex flex-col gap-3" role="list">
          {/* Mensaje cuando no hay items */}
          {items.length === 0 && (
            <p className="text-sm text-muted italic py-3">{emptyHint}</p>
          )}

          {/* Mapear cada item a un EditableArrayItem */}
          {items.map((item, index) => (
            <EditableArrayItem
              key={item.id}
              id={item.id}
              onRemove={() => onRemove(item.id)}
            >
              {/* renderItem viene del padre: sabe cómo editar el item */}
              {renderItem(item.value, index)}
            </EditableArrayItem>
          ))}
        </div>
      </SortableContext>

      {/* Botón para añadir un nuevo item */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-dashed border-accent/40 rounded hover:bg-hover transition-colors text-main"
      >
        <Plus className="w-3.5 h-3.5" />
        {addLabel}
      </button>
    </DndContext>
  );
}
