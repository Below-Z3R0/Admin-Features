/**
 * Fusiona un draft (editado por el admin) con el original (de la BD).
 * Si un campo del draft está vacío, conserva el del original.
 *
 * @param original - El JSON tal cual vino de la BD (la "fuente de verdad")
 * @param draft    - El JSON con los cambios del admin
 * @returns        - Un nuevo objeto fusionado del mismo tipo
 */
export function mergeWithFallback<T>(original: T, draft: T): T {
  function walk(orig: unknown, drf: unknown): unknown {
    if (drf === '' || drf === null || drf === undefined) {
      return orig;
    }

    if (Array.isArray(drf)) {
      return drf.map((item, itemIndex) => {
        if (typeof item === 'object' && item !== null) {
          return walk((orig as unknown[] | undefined)?.[itemIndex], item);
        }
        if (
          (item === '' || item === null || item === undefined) &&
          (orig as unknown[] | undefined)?.[itemIndex]
        ) {
          return (orig as unknown[])[itemIndex];
        }
        return item;
      });
    }

    if (typeof drf === 'object' && drf !== null) {
      const output: Record<string, unknown> = {};
      for (const key of Object.keys(drf as object)) {
        output[key] = walk(
          (orig as Record<string, unknown> | undefined)?.[key],
          (drf as Record<string, unknown>)[key],
        );
      }
      return output;
    }

    return drf;
  }

  return walk(original, draft) as T;
}
