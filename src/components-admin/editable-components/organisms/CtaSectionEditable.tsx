'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { CtaSectionProps } from '@/components/types';

type Props = CtaSectionProps & { blockId: string; lang: string };

export function CtaSectionEditable({ content, form, blockId, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftForm, setDraftForm] = useState(form);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof CtaSectionProps['content']>(key: K, value: CtaSectionProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const setFormField = <K extends keyof CtaSectionProps['form']>(key: K, value: CtaSectionProps['form'][K]) =>
    setDraftForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: { ...content, ...form },
      draftContent: { ...draftContent, ...draftForm },
      setSaving,
      successMessage: 'Sección CTA guardada',
      router,
      supabase,
    });

  return (
    <section id="contacto" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-4xl content-container">
        <header className="mb-8 text-center">
          <EditableText value={draftContent.minititle} onChange={(value) => setField('minititle', value)} placeholder="Minitítulo" ariaLabel="Minitítulo" className="text-[10px] tracking-widest uppercase text-accent-light block mb-2" />
          <EditableText value={draftContent.title} onChange={(value) => setField('title', value)} placeholder="Título" ariaLabel="Título" className="block text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main mb-4" />
          <EditableText value={draftContent.paragraph} onChange={(value) => setField('paragraph', value)} placeholder="Párrafo" ariaLabel="Párrafo" multiline className="text-body text-base leading-relaxed max-w-2xl mx-auto" />
        </header>

        <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
          <EditableText value={draftContent.eslogan} onChange={(value) => setField('eslogan', value)} placeholder="Eslogan" ariaLabel="Eslogan" className="text-sm text-muted text-center" />
          <EditableText value={draftContent.email} onChange={(value) => setField('email', value)} placeholder="Email" ariaLabel="Email" type="email" className="block w-full px-4 py-2 border border-border-mid rounded text-center bg-card" />
        </div>

        <div className="mt-6 flex justify-center">
          <EditableText value={draftForm.placeholder} onChange={(value) => setFormField('placeholder', value)} placeholder="Placeholder" ariaLabel="Placeholder form" className="text-sm text-muted mr-2" />
          <EditableText value={draftForm.button} onChange={(value) => setFormField('button', value)} placeholder="Botón" ariaLabel="Texto botón form" className="inline-block px-5 py-2 bg-accent text-page text-sm font-medium rounded" />
        </div>

        <div className="sticky bottom-4 mt-12 z-20 flex justify-center">
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transition-all">
            {saving ? (<><Loader2 className="w-4 h-4 animate-spin" />Guardando...</>) : (<><Save className="w-4 h-4" />💾 Guardar sección CTA</>)}
          </button>
        </div>
      </div>
    </section>
  );
}
