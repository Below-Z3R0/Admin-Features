-- ============================================================================
-- Centeno Advisory — Schema público para replicación
-- ============================================================================
-- Este archivo contiene SOLO el código que define las tablas, índices,
-- funciones, trigger y políticas RLS del schema `public` que la app
-- consume. NO incluye objetos gestionados por Supabase (auth, storage,
-- realtime, ni el event trigger `rls_auto_enable` que Supabase mantiene
-- automáticamente).
--
-- Para replicar este schema en un proyecto Supabase nuevo:
--   1. Crea un proyecto en https://supabase.com
--   2. Ve a SQL Editor
--   3. Pega y ejecuta este archivo completo
--   4. (Opcional) Pobla la tabla `languages` con los idiomas que necesites
--
-- Reemplaza el UUID del admin en las policies "admin access" por el
-- UUID real del usuario admin en auth.users de tu proyecto.
-- ============================================================================

-- ============================================================================
-- 1. TABLAS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1.1 content_blocks — catálogo de bloques editables de la landing
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_blocks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  key text NOT NULL,
  owner text NOT NULL,
  description text NULL,
  create_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT content_block_pkey PRIMARY KEY (id),
  CONSTRAINT content_block_key_key UNIQUE (key)
);

-- ----------------------------------------------------------------------------
-- 1.2 languages — catálogo de idiomas disponibles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.languages (
  code text NOT NULL,
  name text NOT NULL,
  is_default boolean NULL DEFAULT false,
  create_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT languages_pkey PRIMARY KEY (code)
);

-- ----------------------------------------------------------------------------
-- 1.3 profiles — perfil de cada usuario de auth.users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  username jsonb NULL,
  role text NULL DEFAULT 'client'::text,
  updated_at timestamp with time zone NULL DEFAULT now(),
  email character varying NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id)
    REFERENCES auth.users (id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 1.4 translations — contenido por bloque + idioma (jsonb)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.translations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  block_id uuid NULL,
  lang_code text NULL,
  content jsonb NOT NULL,
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT translations_pkey PRIMARY KEY (id),
  CONSTRAINT translations_block_id_fkey FOREIGN KEY (block_id)
    REFERENCES public.content_blocks (id) ON DELETE CASCADE,
  CONSTRAINT translations_lang_code_fkey FOREIGN KEY (lang_code)
    REFERENCES public.languages (code) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 1.5 posts — posts / artículos del blog
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  author_id uuid NULL,
  image_url text NULL,
  status text NULL DEFAULT 'draft'::text,
  created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT posts_pkey PRIMARY KEY (id)
);

-- ----------------------------------------------------------------------------
-- 1.6 post_translations — traducciones de los posts
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.post_translations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  post_id uuid NULL,
  lang_code text NULL,
  title text NOT NULL,
  slug text NOT NULL,
  body text NOT NULL,
  CONSTRAINT post_translations_pkey PRIMARY KEY (id),
  CONSTRAINT post_translations_post_id_fkey FOREIGN KEY (post_id)
    REFERENCES public.posts (id) ON DELETE CASCADE,
  CONSTRAINT post_translations_lang_code_fkey FOREIGN KEY (lang_code)
    REFERENCES public.languages (code) ON DELETE CASCADE,
  CONSTRAINT post_translations_post_id_lang_code_key
    UNIQUE (post_id, lang_code),
  CONSTRAINT post_translations_slug_key UNIQUE (slug)
);

-- ============================================================================
-- 2. ÍNDICES ADICIONALES (los PK y UNIQUE ya crean los suyos)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_content_blocks_key
  ON public.content_blocks USING btree (key);

CREATE INDEX IF NOT EXISTS idx_translations_lang_block
  ON public.translations USING btree (lang_code, block_id);

-- ============================================================================
-- 3. FUNCIÓN RPC — el corazón de la app
-- ============================================================================
-- Devuelve el `content` jsonb de un bloque en un idioma.
-- La app lo llama con: supabase.rpc('get_translation_by_key', { block_key, lang })
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_translation_by_key(
  block_key text,
  lang text
)
RETURNS jsonb
LANGUAGE sql
STABLE
AS $function$
  SELECT t.content
  FROM public.translations t
  INNER JOIN public.content_blocks cb ON cb.id = t.block_id
  WHERE cb.key = block_key AND t.lang_code = lang
  LIMIT 1;
$function$;

-- ============================================================================
-- 4. TRIGGER HELPER + TRIGGER — perfil automático al registrarse
-- ============================================================================
-- Cuando un usuario nuevo se registra en auth.users, esta función crea
-- automáticamente una fila en `profiles` con `role='client'` por defecto.
-- Luego puedes hacer `UPDATE profiles SET role='admin' WHERE id='<uuid>'`
-- para promoverlo.
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (
    NEW.id,
    to_jsonb(COALESCE(NEW.raw_user_meta_data->>'display_name', 'Usuario Nuevo'::text)),
    NEW.email,
    'client'
  );
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 5. ROW LEVEL SECURITY — habilitar en todas las tablas
-- ============================================================================
ALTER TABLE public.content_blocks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_translations   ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 6. POLÍTICAS RLS
-- ============================================================================
-- IMPORTANTE: Reemplaza '<admin-uuid-aqui>' por el UUID real del usuario
-- admin en auth.users de TU proyecto (Auth → Users → copia el id).
-- O bien, reemplaza la condición por:
--   USING (EXISTS (
--     SELECT 1 FROM public.profiles
--     WHERE profiles.id = (SELECT auth.uid()) AND profiles.role = 'admin'
--   ))
-- que es más mantenible.
-- ============================================================================

-- content_blocks: lectura pública
DROP POLICY IF EXISTS "public read acces" ON public.content_blocks;
CREATE POLICY "public read acces" ON public.content_blocks
  FOR ALL TO public USING (true);

-- profiles: lectura pública
DROP POLICY IF EXISTS "public read acces" ON public.profiles;
CREATE POLICY "public read acces" ON public.profiles
  FOR ALL TO public USING (true);

-- translations: lectura pública + admin puede escribir
DROP POLICY IF EXISTS "public read acces" ON public.translations;
CREATE POLICY "public read acces" ON public.translations
  FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "admin access" ON public.translations;
CREATE POLICY "admin access" ON public.translations
  FOR ALL TO authenticated
  USING      (auth.uid() = '<admin-uuid-aqui>'::uuid)
  WITH CHECK (auth.uid() = '<admin-uuid-aqui>'::uuid);

-- post_translations: lectura pública + admin puede escribir
DROP POLICY IF EXISTS "public read acces post" ON public.post_translations;
CREATE POLICY "public read acces post" ON public.post_translations
  FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "admin access" ON public.post_translations;
CREATE POLICY "admin access" ON public.post_translations
  FOR ALL TO authenticated
  USING      (auth.uid() = '<admin-uuid-aqui>'::uuid)
  WITH CHECK (auth.uid() = '<admin-uuid-aqui>'::uuid);

-- ============================================================================
-- 7. DATOS INICIALES (idiomas por defecto)
-- ============================================================================
-- Descomenta las líneas de abajo y reemplaza los idiomas por los que
-- necesites soportar.
-- ============================================================================

-- INSERT INTO public.languages (code, name, is_default) VALUES
--   ('es', 'Español',  true),
--   ('en', 'English', false);

-- ============================================================================
-- FIN
-- ============================================================================
-- Tras ejecutar este schema, la app puede empezar a consumir el RPC
-- `get_translation_by_key` inmediatamente. Solo recuerda:
--   1. Reemplazar '<admin-uuid-aqui>' por tu UUID de admin
--   2. Crear el usuario admin en Authentication → Users
--   3. INSERT las traducciones que necesites en `public.translations`
--   4. (Opcional) Configurar el auth flow (Google OAuth, etc.) desde el
--      dashboard de Supabase.
-- ============================================================================
