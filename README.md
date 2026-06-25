# Centeno Advisory — Web Platform

Plataforma web pública de **Centeno Advisory** con landing multiidioma (ES/EN), autenticación con Supabase, modo oscuro/claro y un panel de administración con modo edición de contenidos en línea.

> Este repositorio es una **muestra arquitectónica** del proyecto real.
> Todo lo que está aquí es código **públicamente compartible** del proyecto
> Centeno Advisory: la app, su arquitectura y el schema de la base de datos
> que necesita para funcionar.

---

## 📋 Tabla de contenidos

- [Stack](#-stack)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Configuración de Supabase](#-configuración-de-supabase)
- [Variables de entorno](#-variables-de-entorno)
- [Base de datos](#-base-de-datos)
- [Estructura de carpetas](#-estructura-de-carpetas)
- [Licencia](#-licencia)

---

## 🛠️ Stack

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript (strict) |
| Estilos | Tailwind CSS v4 (tokens CSS en `@theme`) |
| Animaciones | framer-motion |
| Auth + DB | Supabase (`@supabase/ssr`) |
| Formularios | react-hook-form + zod |
| Theming | next-themes (light/dark) |
| i18n | Query param `?lang=es\|en` servido desde RPC |
| Iconos | lucide-react + SVGs propios en `src/assets/Icons.tsx` |
| Paquetes | pnpm |

---

## 🏗️ Arquitectura

```
src/
├── app/                        # Next.js App Router
│   ├── (public)/               # Landing pública (/, navbar + footer en layout)
│   ├── (admin)/                # /admin y /admin/edit (protegidos)
│   ├── auth/callback/          # OAuth code → sesión
│   ├── auth/route/             # Post-login: redirige admin → /admin, otros → /
│   ├── login/                  # Página de autenticación
│   ├── error.tsx               # Error boundary global
│   ├── loading.tsx             # Skeletons espejados
│   └── globals.css             # Tokens del sistema de diseño
│
├── components/                 # Atomic Design (server + client)
│   ├── server-components.ts    # Barrel de Server Components
│   ├── client-components.ts    # Barrel de Client Components
│   ├── scheletons.ts           # Barrel de skeletons
│   ├── types.ts                # Tipos e interfaces centralizados
│   ├── atoms/  molecules/  organisms/  animations/  skeletons/
│
├── components-admin/           # Modo edición (solo admin)
│   ├── admin-components/       # AdminNavbar
│   └── editable-components/    # 11 *SectionEditable + EditableText/Array
│
├── hooks/                      # useIsOpen, useTheme, themeProvider
├── schema/                     # Zod schemas (form)
├── services/                   # Orquestadores de Supabase
│   ├── secctions_orchestrator.services.ts
│   ├── cards_orchestrator.service.ts
│   ├── footer.data.service.ts
│   ├── navbar.data.service.ts
│   └── sections/
│       ├── content.service.ts          # RPC get_translation_by_key
│       ├── content.editor.service.ts   # isCurrentUserAdmin, getBlockIdByKey
│       └── save-translation.service.ts # saveTranslation<T> (client)
│
├── staticdata/                 # Fallback en español (sin BD)
├── assets/                     # Iconos SVG (CAIcon, GoogleIcon, LanguageIcon, …)
└── utils/                      # getSiteURL, supabase/{client,server,middleware}
```

### Flujo de la landing

```
page.tsx (Server Component)
  └─ Promise.all
       ├─ getSectionData(lang)   ─┐
       └─ getCardsData(lang)     ─┴─→ getContent(block_key, lang)
                                          └─→ Supabase RPC get_translation_by_key
                                              └─→ (en demo público) staticdata
```

### Flujo de autenticación

```
/login (email+pwd | Google OAuth)
  └─→ Google redirige a /auth/callback?code=…
        └─ exchangeCodeForSession() → cookie de sesión
              └─→ /auth/route (Server Component)
                    ├─ isCurrentUserAdmin() ? redirect('/admin')
                    └─ sino                       redirect('/')
```

El `middleware.ts` refresca la sesión de Supabase en cada request (excepto assets estáticos).

---

## 🚀 Instalación

### Requisitos
- **Node.js** `>= 18.0.0`
- **pnpm** `>= 9.0.0`

### Pasos

```bash
# 1. Clonar
git clone https://github.com/Below-Z3R0/CentenoAdvisory.git
cd CentenoAdvisory

# 2. Instalar dependencias
pnpm install

# 3. Variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# 4. Levantar dev server
pnpm dev

# 5. Abrir en el navegador
# http://localhost:3000
```

### Scripts

| Script | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build |
| `pnpm lint` | ESLint (Next + TS) |

---

## 🔐 Configuración de Supabase

Crea un proyecto en [supabase.com](https://supabase.com) y luego:

### 1. Variables de entorno

En `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://<tu-proyecto>.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<tu-anon-key>"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"   # En prod: tu dominio real
```

### 2. Habilitar Google OAuth

En el dashboard de Supabase:

1. **Authentication → Providers → Google** → habilítalo.
2. Configura **Client ID** y **Client Secret** de Google Cloud Console.
3. **Authentication → URL Configuration**:
   - **Site URL** → `http://localhost:3000` (en dev) o tu dominio en prod.
   - **Redirect URLs** → añade:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/auth/route`
     - (en prod) `https://tu-dominio/auth/callback`
     - (en prod) `https://tu-dominio/auth/route`

> ⚠️ Si no añades las Redirect URLs en Supabase, el login con Google fallará con `redirect_uri_mismatch`.

### 3. Crear la base de datos

Ejecuta el schema en el SQL Editor de Supabase:

➡️ **[`db/schema.sql`](./db/schema.sql)** — tablas, índices, RPC, trigger y RLS.

Después:

- Reemplaza `<admin-uuid-aqui>` en las policies por el UUID real de tu admin (créalo primero en **Authentication → Users**).
- Inserta los idiomas en `public.languages` (ej: `es`, `en`).
- Empieza a poblar `public.translations` con tus bloques.

### 4. (Opcional) Datos de prueba

Sin la BD configurada, la landing usa `src/staticdata/logindata.ts` como fallback para el formulario de login. El resto del contenido se sirve vacío hasta que conectes el RPC `get_translation_by_key`.

---

## 📜 Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Anon key del proyecto |
| `NEXT_PUBLIC_SITE_URL` | Origen del sitio (usado por OAuth redirect). Default: `http://localhost:3000` |

---

## 🗃️ Base de datos

El schema completo de la DB (6 tablas, 5 FKs, 12 índices, RPC, trigger
y políticas RLS) está documentado y replicable.

➡️ **[`db/README.md`](./db/README.md)** — descripción detallada del schema
➡️ **[`db/schema.sql`](./db/schema.sql)** — DDL listo para correr en el SQL Editor
➡️ **[`db/er-diagram.png`](./db/er-diagram.png)** — diagrama entidad-relación

Los `block_key` que la app consume (visibles en `src/services/`) son:

```
home_hero_section            home_differentiator_section
home_personas_section        home_ipmmethod_section
home_ipmscore_section        home_messages_section
home_servicesdesks_section   home_trackrecord_section
home_ethics_section          home_academy_section
home_cta_section

differentiator_article       personas_article
ipmmethod_article            ipmscore_statescard
ipmscore_dimensions          ipmscore_quote
messages_messages            servicesdesks_services
trackrecord_sectors          trackrecord_metrics
trackrecord_growth           ethics_article
academy_articles             cta_form
navbar                       footer
```

Para el panel admin se consulta además la tabla `content_blocks` (`id`, `key`) y la tabla `profiles` (`id`, `role`) para validar el rol del usuario.

---

## 📁 Estructura de carpetas (resumen)

```
src/                 # App Next.js (componentes, servicios, hooks, etc.)
public/              # Assets estáticos (logos, avatares, iconos)
db/                  # Documentación + schema.sql + er-diagram.png de la DB
middleware.ts        # Refresca sesión Supabase en cada request
next.config.ts       # Config de Next.js (React Compiler + allowedDevOrigins)
tsconfig.json        # TS strict
package.json         # Dependencias (pnpm)
LICENSE              # Licencia del proyecto
```

---

## 📄 Licencia

Este demo público se distribuye bajo la **licencia más estricta** que el
autor determine al momento de publicarlo (ver archivo `LICENSE`).

© Centeno Advisory.
