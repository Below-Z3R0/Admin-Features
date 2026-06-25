'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { DifferentiatorProps } from '@/components/types';

type Props = DifferentiatorProps & {
  blockIds: { header: string; cards: string; metrics: string };
  lang: string;
};

export function DifferentiatorSectionEditable({ content, diferentiators, metrics, blockIds, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftDifs, setDraftDifs] = useState(diferentiators);
  const [draftMetrics, setDraftMetrics] = useState(metrics);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof DifferentiatorProps['content']>(key: K, value: DifferentiatorProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateDif = (index: number, fieldKey: keyof DifferentiatorProps['diferentiators'][0], value: string) =>
    setDraftDifs((prev) => prev.map((dif, idx) => (idx === index ? { ...dif, [fieldKey]: value } : dif)));
  const addDif = () => setDraftDifs((prev) => [...prev, { vs: '', title: '', description: '' }]);
  const removeDif = (index: number) => setDraftDifs((prev) => prev.filter((_, idx) => idx !== index));

  const updateMetric = (index: number, fieldKey: keyof DifferentiatorProps['metrics'][0], value: string) =>
    setDraftMetrics((prev) => prev.map((metric, idx) => (idx === index ? { ...metric, [fieldKey]: value } : metric)));
  const addMetric = () => setDraftMetrics((prev) => [...prev, { value: '', description: '' }]);
  const removeMetric = (index: number) => setDraftMetrics((prev) => prev.filter((_, idx) => idx !== index));

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveTranslation({ blockId: blockIds.header, lang, originalContent: content, draftContent: draftContent, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.cards, lang, originalContent: { card: diferentiators }, draftContent: { card: draftDifs }, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.metrics, lang, originalContent: { card: metrics }, draftContent: { card: draftMetrics }, setSaving: () => {}, successMessage: '', router, supabase }),
      ]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="diferenciador" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText value={draftContent.minititle} onChange={(value) => setField('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo" className="text-[10px] tracking-widest uppercase text-accent-light" />
          <EditableText value={draftContent.title} onChange={(value) => setField('title', value)} placeholder="Título" ariaLabel="Título" className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" />
          <EditableText value={draftContent.subtitle} onChange={(value) => setField('subtitle', value)} placeholder="Subtítulo" ariaLabel="Subtítulo" className="text-body text-base leading-relaxed max-w-3xl" />
          <EditableText value={draftContent.paragraph} onChange={(value) => setField('paragraph', value)} placeholder="Párrafo" ariaLabel="Párrafo" multiline className="mt-2 text-body text-base leading-relaxed max-w-3xl" />
        </header>

        <EditableArray
          items={draftDifs.map((dif, index) => ({ id: `d-${index}`, value: dif }))}
          onReorder={setDraftDifs}
          onAdd={addDif}
          onRemove={(id) => removeDif(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir diferenciador"
          emptyHint="Sin diferenciadores. Pulsa 'Añadir' para empezar."
          renderItem={(dif, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText value={dif.vs} onChange={(value) => updateDif(index, 'vs', value)} placeholder="vs" ariaLabel={`vs ${index + 1}`} className="text-[10px] tracking-widest uppercase text-accent-light mb-1" />
              <EditableText value={dif.title} onChange={(value) => updateDif(index, 'title', value)} placeholder="Título" ariaLabel={`Título ${index + 1}`} className="font-sans font-semibold text-main text-base mb-2" />
              <EditableText value={dif.description} onChange={(value) => updateDif(index, 'description', value)} placeholder="Descripción" ariaLabel={`Descripción ${index + 1}`} multiline className="text-sm text-body leading-relaxed" />
            </div>
          )}
        />

        <h3 className="text-lg font-semibold text-main mb-4 mt-12">Métricas</h3>
        <EditableArray
          items={draftMetrics.map((metric, index) => ({ id: `m-${index}`, value: metric }))}
          onReorder={setDraftMetrics}
          onAdd={addMetric}
          onRemove={(id) => removeMetric(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir métrica"
          emptyHint="Sin métricas. Pulsa 'Añadir' para empezar."
          renderItem={(metric, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText value={metric.value} onChange={(value) => updateMetric(index, 'value', value)} placeholder="Valor" ariaLabel={`Valor métrica ${index + 1}`} className="font-sans font-bold text-2xl text-accent mb-2" />
              <EditableText value={metric.description} onChange={(value) => updateMetric(index, 'description', value)} placeholder="Descripción" ariaLabel={`Descripción métrica ${index + 1}`} className="text-sm text-body leading-relaxed" />
            </div>
          )}
        />

        <div className="sticky bottom-4 mt-12 z-20 flex justify-center">
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transition-all">
            {saving ? (<><Loader2 className="w-4 h-4 animate-spin" />Guardando...</>) : (<><Save className="w-4 h-4" />💾 Guardar Diferenciador</>)}
          </button>
        </div>
      </div>
    </section>
  );
}
