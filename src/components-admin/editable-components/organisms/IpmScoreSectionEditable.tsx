'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { IpmScoreProps } from '@/components/types';

type Props = IpmScoreProps & {
  blockIds: { content: string; statescard: string; dimensions: string; quote: string };
  lang: string;
};

export function IpmScoreSectionEditable({ content, statescard, dimensions, quote, blockIds, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftStates, setDraftStates] = useState(statescard);
  const [draftDimensions, setDraftDimensions] = useState(dimensions);
  const [draftQuote, setDraftQuote] = useState(quote);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof IpmScoreProps['content']>(key: K, value: IpmScoreProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateState = (index: number, fieldKey: keyof IpmScoreProps['statescard'][0], value: string) =>
    setDraftStates((prev) => prev.map((state, idx) => (idx === index ? { ...state, [fieldKey]: value } : state)));
  const addState = () => setDraftStates((prev) => [...prev, { score: '', state: '', recomendations: '' }]);
  const removeState = (index: number) => setDraftStates((prev) => prev.filter((_, idx) => idx !== index));

  const setDim = (key: keyof IpmScoreProps['dimensions'], value: string | string[]) =>
    setDraftDimensions((prev) => ({ ...prev, [key]: value }));
  const updateDimItem = (dimIndex: number, value: string) =>
    setDim('card', draftDimensions.card.map((dim, idx) => (idx === dimIndex ? value : dim)));

  const setQuote = <K extends keyof IpmScoreProps['quote']>(key: K, value: IpmScoreProps['quote'][K]) =>
    setDraftQuote((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveTranslation({ blockId: blockIds.content, lang, originalContent: content, draftContent: draftContent, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.statescard, lang, originalContent: { card: statescard }, draftContent: { card: draftStates }, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.dimensions, lang, originalContent: dimensions, draftContent: draftDimensions, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.quote, lang, originalContent: quote, draftContent: draftQuote, setSaving: () => {}, successMessage: '', router, supabase }),
      ]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="ipm-score" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText value={draftContent.minititle} onChange={(value) => setField('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo" className="text-[10px] tracking-widest uppercase text-accent-light" />
          <EditableText value={draftContent.title} onChange={(value) => setField('title', value)} placeholder="Título" ariaLabel="Título" className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" />
          <EditableText value={draftContent.description} onChange={(value) => setField('description', value)} placeholder="Descripción" ariaLabel="Descripción" multiline className="text-body text-base leading-relaxed max-w-3xl" />
        </header>

        <h3 className="text-lg font-semibold text-main mb-4">Estados de score</h3>
        <EditableArray
          items={draftStates.map((state, index) => ({ id: `s-${index}`, value: state }))}
          onReorder={setDraftStates}
          onAdd={addState}
          onRemove={(id) => removeState(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir estado"
          emptyHint="Sin estados. Pulsa 'Añadir' para empezar."
          renderItem={(state, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText value={state.score} onChange={(value) => updateState(index, 'score', value)} placeholder="Score" ariaLabel={`Score ${index + 1}`} className="font-sans font-bold text-2xl text-accent mb-2" />
              <EditableText value={state.state} onChange={(value) => updateState(index, 'state', value)} placeholder="Estado" ariaLabel={`Estado ${index + 1}`} className="font-sans font-semibold text-main text-base mb-2" />
              <EditableText value={state.recomendations} onChange={(value) => updateState(index, 'recomendations', value)} placeholder="Recomendaciones" ariaLabel={`Recomendaciones ${index + 1}`} multiline className="text-sm text-body leading-relaxed" />
            </div>
          )}
        />

        <h3 className="text-lg font-semibold text-main mb-4 mt-12">Dimensiones</h3>
        <div className="mb-4">
          <EditableText value={draftDimensions.minititle} onChange={(value) => setDim('minititle', value)} placeholder="Minitítulo dimensiones" ariaLabel="Minitítulo dimensiones" className="text-[10px] tracking-widest uppercase text-accent-light" />
        </div>
        <div className="space-y-2 mb-8">
          {draftDimensions.card.map((dim, dimIndex) => (
            <EditableText key={dimIndex} value={dim} onChange={(value) => updateDimItem(dimIndex, value)} placeholder={`Dimensión ${dimIndex + 1}`} ariaLabel={`Dimensión ${dimIndex + 1}`} className="block w-full text-sm text-body" />
          ))}
        </div>

        <h3 className="text-lg font-semibold text-main mb-4">Quote</h3>
        <div className="mb-8">
          <EditableText value={draftQuote.title} onChange={(value) => setQuote('title', value)} placeholder="Título quote" ariaLabel="Título quote" className="font-sans font-semibold text-main text-base mb-2 block" />
          <EditableText value={draftQuote.paragraph} onChange={(value) => setQuote('paragraph', value)} placeholder="Párrafo quote" ariaLabel="Párrafo quote" multiline className="text-sm text-body leading-relaxed" />
        </div>

        <div className="sticky bottom-4 mt-12 z-20 flex justify-center">
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transition-all">
            {saving ? (<><Loader2 className="w-4 h-4 animate-spin" />Guardando...</>) : (<><Save className="w-4 h-4" />💾 Guardar IPM Score</>)}
          </button>
        </div>
      </div>
    </section>
  );
}
