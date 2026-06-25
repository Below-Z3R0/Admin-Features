/**
 * Genera un id local a partir de un índice.
 * Patrón: `${prefix}-${index}` (ej: "c-0", "m-2", "s-1")
 *
 * Usado por EditableArray y los componentes para identificar items en
 * callbacks de remove/update sin capturar el índice en el closure.
 */
export const makeId = (prefix: string, index: number): string =>
  `${prefix}-${index}`;

/**
 * Parsea un id generado con makeId y devuelve el índice.
 * @returns El índice, o -1 si el id no es válido.
 */
export const parseIdIndex = (id: string): number => {
  const segments = id.split('-');
  if (segments.length < 2) return -1;
  const lastSegment = segments[segments.length - 1];
  const parsedIndex = parseInt(lastSegment, 10);
  return isNaN(parsedIndex) ? -1 : parsedIndex;
};

/**
 * Elimina un item del array por su id (formato "prefix-index").
 */
export function removeItemById<T>(items: T[], id: string): T[] {
  const index = parseIdIndex(id);
  if (index < 0 || index >= items.length) return items;
  return items.filter((_, itemIndex) => itemIndex !== index);
}

/**
 * Añade un item vacío al final del array.
 */
export function addEmptyItem<T>(items: T[], emptyItem: T): T[] {
  return [...items, emptyItem];
}

/**
 * Actualiza varios campos de un item en un índice dado.
 */
export function updateItem<T>(items: T[], index: number, updates: Partial<T>): T[] {
  if (index < 0 || index >= items.length) return items;
  const next = [...items];
  next[index] = { ...next[index], ...updates };
  return next;
}
