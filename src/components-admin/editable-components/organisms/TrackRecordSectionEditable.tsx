'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { TrackRecordProps } from '@/components/types';

type Props = TrackRecordProps & {
  blockIds: { content: string; metrics: string; sectors: string; growth: string };
  lang: string;
};

export function TrackRecordSectionEditable({ content, sectors, metrics, growth, blockIds, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftSectors, setDraftSectors] = useState(sectors);
  const [draftMetrics, setDraftMetrics] = useState(metrics);
  const [draftGrowth, setDraftGrowth] = useState(growth);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof TrackRecordProps['content']>(key: K, value: TrackRecordProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateSector = (index: number, value: string) =>
    setDraftSectors((prev) => ({ ...prev, card: prev.card.map((sector, idx) => (idx === index ? { title: value } : sector)) }));
  const addSector = () => setDraftSectors((prev) => ({ ...prev, card: [...prev.card, { title: '' }] }));
  const removeSector = (index: number) => setDraftSectors((prev) => ({ ...prev, card: prev.card.filter((_, idx) => idx !== index) }));
  const setSectorField = <K extends keyof TrackRecordProps['sectors']>(key: K, value: TrackRecordProps['sectors'][K]) =>
    setDraftSectors((prev) => ({ ...prev, [key]: value }));

  const updateMetric = (index: number, fieldKey: keyof TrackRecordProps['metrics']['card'][0], value: string) =>
    setDraftMetrics((prev) => ({ ...prev, card: prev.card.map((metric, idx) => (idx === index ? { ...metric, [fieldKey]: value } : metric)) }));
  const addMetric = () => setDraftMetrics((prev) => ({ ...prev, card: [...prev.card, { value: '', label: '', bar: 0 }] }));
  const removeMetric = (index: number) => setDraftMetrics((prev) => ({ ...prev, card: prev.card.filter((_, idx) => idx !== index) }));
  const setMetricField = <K extends keyof Omit<TrackRecordProps['metrics'], 'card'>>(key: K, value: Omit<TrackRecordProps['metrics'], 'card'>[K]) =>
    setDraftMetrics((prev) => ({ ...prev, [key]: value }));

  const setGrowth = <K extends keyof TrackRecordProps['growth']>(key: K, value: TrackRecordProps['growth'][K]) =>
    setDraftGrowth((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveTranslation({ blockId: blockIds.content, lang, originalContent: content, draftContent: draftContent, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.sectors, lang, originalContent: sectors, draftContent: draftSectors, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.metrics, lang, originalContent: metrics, draftContent: draftMetrics, setSaving: () => {}, successMessage: '', router, supabase }),
        saveTranslation({ blockId: blockIds.growth, lang, originalContent: growth, draftContent: draftGrowth, setSaving: () => {}, successMessage: '', router, supabase }),
      ]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="track-record" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText value={draftContent.minititle} onChange={(value) => setField('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo" className="text-[10px] tracking-widest uppercase text-accent-light" />
        </header>

        <h3 className="text-lg font-semibold text-main mb-4">Métricas</h3>
        <EditableText value={draftMetrics.title} onChange={(value) => setMetricField('title', value)} placeholder="Título métricas" ariaLabel="Título métricas" className="font-sans font-semibold text-main text-base mb-2 block" />
        <EditableArray
          items={draftMetrics.card.map((metric, index) => ({ id: `m-${index}`, value: metric }))}
          onReorder={(next) => setDraftMetrics((prev) => ({ ...prev, card: next }))}
          onAdd={addMetric}
          onRemove={(id) => removeMetric(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir métrica"
          emptyHint="Sin métricas. Pulsa 'Añadir' para empezar."
          renderItem={(metric, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText value={metric.value} onChange={(value) => updateMetric(index, 'value', value)} placeholder="Valor" ariaLabel={`Valor métrica ${index + 1}`} className="font-sans font-bold text-xl text-accent mb-2" />
              <EditableText value={metric.label} onChange={(value) => updateMetric(index, 'label', value)} placeholder="Label" ariaLabel={`Label métrica ${index + 1}`} className="text-sm text-body leading-relaxed" />
            </div>
          )}
        />

        <h3 className="text-lg font-semibold text-main mb-4 mt-12">Sectores</h3>
        <EditableText value={draftSectors.title} onChange={(value) => setSectorField('title', value)} placeholder="Título sectores" ariaLabel="Título sectores" className="font-sans font-semibold text-main text-base mb-2 block" />
        <EditableText value={draftSectors.paragraph} onChange={(value) => setSectorField('paragraph', value)} placeholder="Párrafo sectores" ariaLabel="Párrafo sectores" multiline className="text-sm text-body leading-relaxed mb-4" />
        <EditableArray
          items={draftSectors.card.map((sector, index) => ({ id: `s-${index}`, value: sector }))}
          onReorder={(next) => setDraftSectors((prev) => ({ ...prev, card: next }))}
          onAdd={addSector}
          onRemove={(id) => removeSector(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir sector"
          emptyHint="Sin sectores. Pulsa 'Añadir' para empezar."
          renderItem={(sector, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText value={sector.title} onChange={(value) => updateSector(index, value)} placeholder={`Sector ${index + 1}`} ariaLabel={`Sector ${index + 1}`} className="text-sm text-main" />
            </div>
          )}
        />

        <h3 className="text-lg font-semibold text-main mb-4 mt-12">Crecimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EditableText value={draftGrowth.minititle} onChange={(value) => setGrowth('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo growth" className="text-[10px] tracking-widest uppercase text-accent-light" />
          <EditableText value={draftGrowth.percentage} onChange={(value) => setGrowth('percentage', value)} placeholder="Porcentaje" ariaLabel="Porcentaje growth" className="font-sans font-bold text-2xl text-accent" />
          <EditableText value={draftGrowth.paragraph} onChange={(value) => setGrowth('paragraph', value)} placeholder="Párrafo" ariaLabel="Párrafo growth" multiline className="text-sm text-body leading-relaxed" />
          <EditableText value={draftGrowth.years} onChange={(value) => setGrowth('years', value)} placeholder="Años" ariaLabel="Años growth" className="text-sm text-body" />
        </div>

        <div className="sticky bottom-4 mt-12 z-20 flex justify-center">
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transition-all">
            {saving ? (<><Loader2 className="w-4 h-4 animate-spin" />Guardando...</>) : (<><Save className="w-4 h-4" />💾 Guardar Track Record</>)}
          </button>
        </div>
      </div>
    </section>
  );
}
