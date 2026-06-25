'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { AcademyProps } from '@/components/types';

type Props = AcademyProps & { blockId: string; lang: string };

export function AcademySectionEditable({ content, articles, blockId, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftArticles, setDraftArticles] = useState(articles);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof AcademyProps['content']>(key: K, value: AcademyProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateArticle = (index: number, fieldKey: keyof AcademyProps['articles'][0], value: string) =>
    setDraftArticles((prev) => prev.map((article, idx) => (idx === index ? { ...article, [fieldKey]: value } : article)));

  const addArticle = () => setDraftArticles((prev) => [...prev, { title: '', paragraph: '', read: '' }]);
  const removeArticle = (index: number) => setDraftArticles((prev) => prev.filter((_, idx) => idx !== index));

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: { ...content, articles },
      draftContent: { ...draftContent, articles: draftArticles },
      setSaving,
      successMessage: 'Sección Academia guardada',
      router,
      supabase,
    });

  return (
    <section id="academia" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText value={draftContent.minititle} onChange={(value) => setField('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo" className="text-[10px] tracking-widest uppercase text-accent-light" />
          <EditableText value={draftContent.title} onChange={(value) => setField('title', value)} placeholder="Título" ariaLabel="Título" className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" />
        </header>

        <EditableArray
          items={draftArticles.map((article, index) => ({ id: `a-${index}`, value: article }))}
          onReorder={setDraftArticles}
          onAdd={addArticle}
          onRemove={(id) => removeArticle(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir artículo"
          emptyHint="Sin artículos. Pulsa 'Añadir' para empezar."
          renderItem={(article, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText value={article.title} onChange={(value) => updateArticle(index, 'title', value)} placeholder="Título" ariaLabel={`Título artículo ${index + 1}`} className="font-sans font-semibold text-main text-base mb-2" />
              <EditableText value={article.paragraph} onChange={(value) => updateArticle(index, 'paragraph', value)} placeholder="Párrafo" ariaLabel={`Párrafo artículo ${index + 1}`} multiline className="text-sm text-body leading-relaxed mb-2" />
              <EditableText value={article.read} onChange={(value) => updateArticle(index, 'read', value)} placeholder="Texto 'Leer más'" ariaLabel={`Texto leer más artículo ${index + 1}`} className="text-xs text-accent" />
            </div>
          )}
        />

        <div className="sticky bottom-4 mt-12 z-20 flex justify-center">
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transition-all">
            {saving ? (<><Loader2 className="w-4 h-4 animate-spin" />Guardando...</>) : (<><Save className="w-4 h-4" />💾 Guardar sección Academia</>)}
          </button>
        </div>
      </div>
    </section>
  );
}
