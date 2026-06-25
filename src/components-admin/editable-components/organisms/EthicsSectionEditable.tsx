'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { EthicsProps } from '@/components/types';

type Props = EthicsProps & { blockId: string; lang: string };

export function EthicsSectionEditable({ content, article, blockId, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftArticle, setDraftArticle] = useState(article);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof EthicsProps['content']>(key: K, value: EthicsProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateItem = (index: number, fieldKey: keyof EthicsProps['article'][0], value: string) =>
    setDraftArticle((prev) => prev.map((item, idx) => (idx === index ? { ...item, [fieldKey]: value } : item)));

  const addItem = () => setDraftArticle((prev) => [...prev, { title: '', paragraph: '' }]);
  const removeItem = (index: number) => setDraftArticle((prev) => prev.filter((_, idx) => idx !== index));

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: { ...content, article },
      draftContent: { ...draftContent, article: draftArticle },
      setSaving,
      successMessage: 'Sección Ética guardada',
      router,
      supabase,
    });

  return (
    <section id="etica" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText value={draftContent.minititle} onChange={(value) => setField('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo" className="text-[10px] tracking-widest uppercase text-accent-light" />
          <EditableText value={draftContent.title} onChange={(value) => setField('title', value)} placeholder="Título" ariaLabel="Título" className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" />
        </header>

        <EditableArray
          items={draftArticle.map((item, index) => ({ id: `e-${index}`, value: item }))}
          onReorder={setDraftArticle}
          onAdd={addItem}
          onRemove={(id) => removeItem(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir item"
          emptyHint="Sin items. Pulsa 'Añadir' para empezar."
          renderItem={(item, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText value={item.title} onChange={(value) => updateItem(index, 'title', value)} placeholder="Título" ariaLabel={`Título ética ${index + 1}`} className="font-sans font-semibold text-main text-base mb-2" />
              <EditableText value={item.paragraph} onChange={(value) => updateItem(index, 'paragraph', value)} placeholder="Párrafo" ariaLabel={`Párrafo ética ${index + 1}`} multiline className="text-sm text-body leading-relaxed" />
            </div>
          )}
        />

        <div className="sticky bottom-4 mt-12 z-20 flex justify-center">
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transition-all">
            {saving ? (<><Loader2 className="w-4 h-4 animate-spin" />Guardando...</>) : (<><Save className="w-4 h-4" />💾 Guardar sección Ética</>)}
          </button>
        </div>
      </div>
    </section>
  );
}
