'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { IpmMethodProps } from '@/components/types';

type Props = IpmMethodProps & { blockId: string; lang: string };

export function IpmMethodSectionEditable({ content, article, blockId, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftArticle, setDraftArticle] = useState(article);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof IpmMethodProps['content']>(key: K, value: IpmMethodProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateStep = (index: number, fieldKey: keyof IpmMethodProps['article'][0], value: string) =>
    setDraftArticle((prev) => prev.map((step, idx) => (idx === index ? { ...step, [fieldKey]: value } : step)));

  const addStep = () => setDraftArticle((prev) => [...prev, { title: '', description: '', prods: '' }]);
  const removeStep = (index: number) => setDraftArticle((prev) => prev.filter((_, idx) => idx !== index));

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: { ...content, article },
      draftContent: { ...draftContent, article: draftArticle },
      setSaving,
      successMessage: 'Sección IPM Method guardada',
      router,
      supabase,
    });

  return (
    <section id="metodo" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText
            value={draftContent.minititle}
            onChange={(value) => setField('minititle', value)}
            placeholder="Minitítulo"
            ariaLabel="Minitítulo"
            className="text-[10px] tracking-widest uppercase text-accent-light"
          />
          <EditableText
            value={draftContent.title}
            onChange={(value) => setField('title', value)}
            placeholder="Título"
            ariaLabel="Título"
            className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main"
          />
          <EditableText
            value={draftContent.paragraph}
            onChange={(value) => setField('paragraph', value)}
            placeholder="Párrafo"
            ariaLabel="Párrafo"
            multiline
            className="text-body text-base leading-relaxed max-w-3xl"
          />
        </header>

        <EditableArray
          items={draftArticle.map((step, index) => ({ id: `s-${index}`, value: step }))}
          onReorder={setDraftArticle}
          onAdd={addStep}
          onRemove={(id) => removeStep(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir paso"
          emptyHint="Sin pasos. Pulsa 'Añadir' para empezar."
          renderItem={(step, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText
                value={step.title}
                onChange={(value) => updateStep(index, 'title', value)}
                placeholder="Título del paso"
                ariaLabel={`Título paso ${index + 1}`}
                className="font-sans font-semibold text-main text-base mb-2"
              />
              <EditableText
                value={step.description}
                onChange={(value) => updateStep(index, 'description', value)}
                placeholder="Descripción"
                ariaLabel={`Descripción paso ${index + 1}`}
                multiline
                className="text-sm text-body leading-relaxed mb-2"
              />
              <EditableText
                value={step.prods}
                onChange={(value) => updateStep(index, 'prods', value)}
                placeholder="Productos"
                ariaLabel={`Productos paso ${index + 1}`}
                className="text-xs text-muted"
              />
            </div>
          )}
        />

        <div className="mt-8">
          <EditableText
            value={draftContent.button}
            onChange={(value) => setField('button', value)}
            placeholder="Texto del botón"
            ariaLabel="Texto del botón"
            className="inline-block px-5 py-3 bg-accent text-page text-sm font-medium rounded-md"
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
                💾 Guardar sección IPM Method
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
