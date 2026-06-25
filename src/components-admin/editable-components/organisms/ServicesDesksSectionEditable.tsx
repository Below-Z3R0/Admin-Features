'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { ServicesProps } from '@/components/types';

type Props = ServicesProps & { blockId: string; lang: string };

export function ServicesDesksSectionEditable({ content, card, blockId, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftCard, setDraftCard] = useState(card);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof ServicesProps['content']>(key: K, value: ServicesProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateService = (index: number, fieldKey: keyof ServicesProps['card'][0], value: string | string[]) =>
    setDraftCard((prev) => prev.map((service, idx) => (idx === index ? { ...service, [fieldKey]: value } : service)));

  const updateProd = (serviceIndex: number, prodIndex: number, value: string) =>
    setDraftCard((prev) =>
      prev.map((service, idx) =>
        idx === serviceIndex
          ? { ...service, prods: service.prods.map((prod, k) => (k === prodIndex ? value : prod)) }
          : service,
      ),
    );

  const addService = () =>
    setDraftCard((prev) => [...prev, { minititle: '', title: '', description: '', prods: [] }]);
  const removeService = (index: number) => setDraftCard((prev) => prev.filter((_, idx) => idx !== index));

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: { ...content, card },
      draftContent: { ...draftContent, card: draftCard },
      setSaving,
      successMessage: 'Sección Servicios guardada',
      router,
      supabase,
    });

  return (
    <section id="servicios" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <EditableText value={draftContent.minititle} onChange={(value) => setField('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo" className="text-[10px] tracking-widest uppercase text-accent-light" />
          <EditableText value={draftContent.title} onChange={(value) => setField('title', value)} placeholder="Título" ariaLabel="Título" className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" />
          <EditableText value={draftContent.description} onChange={(value) => setField('description', value)} placeholder="Descripción" ariaLabel="Descripción" multiline className="text-body text-base leading-relaxed max-w-3xl" />
        </header>

        <EditableArray
          items={draftCard.map((service, index) => ({ id: `s-${index}`, value: service }))}
          onReorder={setDraftCard}
          onAdd={addService}
          onRemove={(id) => removeService(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir servicio"
          emptyHint="Sin servicios. Pulsa 'Añadir' para empezar."
          renderItem={(service, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText
                value={service.minititle}
                onChange={(value) => updateService(index, 'minititle', value)}
                placeholder="Minitítulo"
                ariaLabel={`Minitítulo servicio ${index + 1}`}
                className="text-[10px] tracking-widest uppercase text-accent-light mb-1"
              />
              <EditableText
                value={service.title}
                onChange={(value) => updateService(index, 'title', value)}
                placeholder="Título"
                ariaLabel={`Título servicio ${index + 1}`}
                className="font-sans font-semibold text-main text-base mb-2"
              />
              <EditableText
                value={service.description}
                onChange={(value) => updateService(index, 'description', value)}
                placeholder="Descripción"
                ariaLabel={`Descripción servicio ${index + 1}`}
                multiline
                className="text-sm text-body leading-relaxed mb-2"
              />
              <div className="space-y-1">
                {service.prods.map((prod, prodIndex) => (
                  <EditableText
                    key={prodIndex}
                    value={prod}
                    onChange={(value) => updateProd(index, prodIndex, value)}
                    placeholder={`Producto ${prodIndex + 1}`}
                    ariaLabel={`Producto ${prodIndex + 1} servicio ${index + 1}`}
                    className="block text-xs text-body"
                  />
                ))}
              </div>
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
                💾 Guardar sección Servicios
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
