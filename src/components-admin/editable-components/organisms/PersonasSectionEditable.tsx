'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { PersonasProps } from '@/components/types';

type Props = PersonasProps & { blockId: string; lang: string };

export function PersonasSectionEditable({ content, card, blockId, lang }: Props) {
  const [draftHeader, setDraftHeader] = useState(content);
  const [draftCards, setDraftCards] = useState(card);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setHeader = <K extends keyof PersonasProps['content']>(key: K, value: PersonasProps['content'][K]) =>
    setDraftHeader((prev) => ({ ...prev, [key]: value }));

  const updateCard = (index: number, fieldKey: keyof PersonasProps['card'][0], value: string) =>
    setDraftCards((prev) => prev.map((cardItem, idx) => (idx === index ? { ...cardItem, [fieldKey]: value } : cardItem)));

  const addCard = () => setDraftCards((prev) => [...prev, { title: '', paragraph: '' }]);
  const removeCard = (index: number) => setDraftCards((prev) => prev.filter((_, idx) => idx !== index));

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: { ...content, card },
      draftContent: { ...draftHeader, card: draftCards },
      setSaving,
      successMessage: 'Sección Personas guardada',
      router,
      supabase,
    });

  return (
    <section id="para-quien" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText
            value={draftHeader.minititle}
            onChange={(value) => setHeader('minititle', value)}
            placeholder="Minitítulo"
            ariaLabel="Minitítulo"
            className="text-[10px] tracking-widest uppercase text-accent-light"
          />
          <EditableText
            value={draftHeader.title}
            onChange={(value) => setHeader('title', value)}
            placeholder="Título"
            ariaLabel="Título"
            className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main"
          />
        </header>

        <EditableArray
          items={draftCards.map((cardItem, index) => ({ id: `c-${index}`, value: cardItem }))}
          onReorder={setDraftCards}
          onAdd={addCard}
          onRemove={(id) => removeCard(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir perfil"
          emptyHint="Sin perfiles. Pulsa 'Añadir' para empezar."
          renderItem={(cardItem, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText
                value={cardItem.title}
                onChange={(value) => updateCard(index, 'title', value)}
                placeholder="Título del perfil"
                ariaLabel={`Título perfil ${index + 1}`}
                className="font-sans font-semibold text-main text-base mb-2"
              />
              <EditableText
                value={cardItem.paragraph}
                onChange={(value) => updateCard(index, 'paragraph', value)}
                placeholder="Descripción del perfil"
                ariaLabel={`Descripción perfil ${index + 1}`}
                multiline
                className="text-sm text-body leading-relaxed"
              />
            </div>
          )}
        />

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
                💾 Guardar sección Personas
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
