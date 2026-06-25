# 📁 components-admin/admin-components/

## Propósito

Esta carpeta está reservada para **componentes compartidos de admin** que NO son específicos del modo edición. Ejemplos:

- `AdminNavbar` — variante del Navbar con botones "Modo edición" / "View changes"
- `AdminBadge` — un pill que indica que estás en /admin
- `AdminBanner` — un banner sticky de "Estás en modo admin"
- `AdminFloatingButton` — botón flotante de acción rápida

## Estado actual

**Vacía por ahora.** El usuario va a modificar el `Navbar` existente (`src/components/organisms/NavBar.tsx` o `src/components/molecules/`) para añadir el botón "Modo edición" / "View changes" en lugar de crear un `AdminNavbar` separado.

## Cuando la llenes

Cada componente aquí debe:
1. Ser **client component** (`'use client'`) si usa hooks, eventos o estado
2. **Reutilizar tokens del sistema de colores** (`text-main`, `bg-card`, `border-accent`, etc.) — heredados automáticamente del root layout
3. **Reexportarse desde `index.ts`** (el barrel)
4. Tener **tipos en `types.ts`** si son complejos

## Cómo importar

```tsx
// Desde cualquier lugar de la app
import { AdminNavbar } from '@/components-admin/admin-components';
// → resuelve a admin-components/index.ts → 'molecules/AdminNavbar'
```

## Estructura recomendada (cuando se llene)

```
admin-components/
├── atoms/              # elementos simples
│   └── AdminBadge.tsx
├── molecules/          # combinaciones
│   ├── AdminNavbar.tsx
│   └── AdminFloatingButton.tsx
├── organisms/          # secciones admin completas (si las hay)
├── types.ts            # tipos compartidos
├── index.ts            # barrel
└── README.md           # este archivo
```
