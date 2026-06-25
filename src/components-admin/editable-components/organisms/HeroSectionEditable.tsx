// ============================================
// HeroSectionEditable (ORGANISMO)
// ============================================
// Versión editable del HeroSection público.
// 1 block_key: home_hero_section
//
// PATRÓN:
//   1. Tipos de `@/components/types` (no inline)
//   2. Service `saveTranslation` (no handleSave inline)
//   3. Render usa EditableText / EditableArray
// ============================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowRight, Sparkles, Zap, Shield, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { HeroProps } from '@/components/types';

type Props = HeroProps & { blockId: string; lang: string };

export function HeroSectionEditable({ content, blockId, lang }: Props) {
  const [draft, setDraft] = useState(content);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Helpers de actualización
  const setField = <K extends keyof HeroProps['content']>(k: K, v: HeroProps['content'][K]) =>
    setDraft((p) => ({ ...p, [k]: v }));

  const setCardField = <K extends keyof HeroProps['content']['card']>(k: K, v: HeroProps['content']['card'][K]) =>
    setDraft((p) => ({ ...p, card: { ...p.card, [k]: v } }));

  // brand usa EditableArray (drag & drop)
  const setBrandItem = (i: number, v: string) => {
    const next = [...draft.brand];
    next[i] = v;
    setField('brand', next);
  };
  const addBrand = () => setField('brand', [...draft.brand, '']);
  const removeBrand = (id: string) => {
    const i = parseInt(id.split('-')[1], 10);
    setField('brand', draft.brand.filter((_, idx) => idx !== i));
  };
  const reorderBrand = (next: string[]) => setField('brand', next);

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: content,
      draftContent: draft,
      setSaving,
      successMessage: 'Sección Hero guardada',
      router,
      supabase,
    });

  return (
    <section
      className="relative bg-page min-h-screen pt-28 md:pt-40 pb-20 px-6 md:px-12 overflow-hidden"
      aria-labelledby="hero-title-editable"
      id="top"
    >
      <div className="absolute top-0 inset-x-0 z-30 bg-accent text-page text-xs font-semibold py-1.5 px-4 text-center">
        ✏️ MODO EDICIÓN — Hero ({lang.toUpperCase()})
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-mid/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* firm */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-mid bg-card/50 backdrop-blur-sm w-full max-w-md">
            <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
            <EditableText
              value={draft.firm}
              onChange={(v) => setField('firm', v)}
              placeholder="Etiqueta superior"
              ariaLabel="Etiqueta superior"
              className="text-xs font-medium text-body"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start w-full">
          <header className="flex flex-col gap-6 w-full text-center lg:text-left">
            <EditableText
              value={draft.title}
              onChange={(v) => setField('title', v)}
              placeholder="Título principal"
              ariaLabel="Título principal"
              className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-bold leading-[1.05] tracking-tight text-main"
            />
            <EditableText
              value={draft.subtitle}
              onChange={(v) => setField('subtitle', v)}
              placeholder="Subtítulo"
              ariaLabel="Subtítulo"
              className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-sans font-normal text-body leading-relaxed"
            />
            <div className="flex flex-wrap items-center gap-3 mt-4 justify-center lg:justify-start">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-alt text-page text-sm font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Agendar consulta
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#metodo"
                className="inline-flex items-center gap-2 px-5 py-3 border border-border-mid hover:border-accent text-main text-sm font-medium rounded-md transition-all duration-200 hover:bg-hover"
              >
                Conocer método
              </a>
            </div>
          </header>

          <div className="flex flex-col gap-6 w-full max-w-lg mx-auto lg:mx-0">
            <EditableText
              value={draft.card.paragraph}
              onChange={(v) => setCardField('paragraph', v)}
              placeholder="Párrafo descriptivo"
              ariaLabel="Párrafo descriptivo"
              multiline
              className="text-body text-base leading-relaxed"
            />
            <div className="p-4 rounded-lg border border-border-mid bg-card/50 backdrop-blur-sm">
              <EditableText
                value={draft.card.promise}
                onChange={(v) => setCardField('promise', v)}
                placeholder="Promesa destacada"
                ariaLabel="Promesa destacada"
                multiline
                className="text-main font-medium text-sm leading-relaxed"
              />
            </div>
            <ul className="flex flex-col gap-2.5" role="list">
              {draft.card.smallcard.map((label, index) => {
                const Icon = index === 0 ? Zap : index === 1 ? Shield : Sparkles;
                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-md border border-border-subtle bg-card/30"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-md bg-accent-soft flex items-center justify-center">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <EditableText
                      value={label}
                      onChange={(v) => {
                        const next = [...draft.card.smallcard];
                        next[index] = v;
                        setCardField('smallcard', next);
                      }}
                      placeholder={`Característica ${index + 1}`}
                      ariaLabel={`Característica ${index + 1}`}
                      className="text-sm uppercase tracking-widest text-main"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* brand (EditableArray con drag & drop) */}
        <div className="hidden md:block mt-24 pt-8 border-t border-border-subtle">
          <EditableArray
            items={draft.brand.map((v, i) => ({ id: `b-${i}`, value: v }))}
            onReorder={reorderBrand}
            onAdd={addBrand}
            onRemove={removeBrand}
            addLabel="Añadir brand"
            emptyHint="Sin brands. Pulsa 'Añadir' para empezar."
            renderItem={(value, index) => (
              <EditableText
                value={value}
                onChange={(v) => setBrandItem(index, v)}
                placeholder={`Brand ${index + 1}`}
                ariaLabel={`Brand ${index + 1}`}
                className="text-[11px] tracking-wider uppercase text-muted font-medium"
              />
            )}
          />
        </div>

        <div className="sticky bottom-4 mt-12 z-20 flex justify-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                💾 Guardar sección Hero
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
