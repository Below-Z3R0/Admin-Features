'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { EditableText } from '../atoms/EditableText';
import { EditableArray } from '../molecules/EditableArray';
import { saveTranslation } from '@/services/sections/save-translation.service';
import type { MessagesProps } from '@/components/types';

type Props = MessagesProps & { blockId: string; lang: string };

export function MessagesSectionEditable({ content, messages, blockId, lang }: Props) {
  const [draftContent, setDraftContent] = useState(content);
  const [draftMessages, setDraftMessages] = useState(messages);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const setField = <K extends keyof MessagesProps['content']>(key: K, value: MessagesProps['content'][K]) =>
    setDraftContent((prev) => ({ ...prev, [key]: value }));

  const updateMessage = (index: number, fieldKey: keyof MessagesProps['messages'][0], value: string | string[]) =>
    setDraftMessages((prev) => prev.map((msg, idx) => (idx === index ? { ...msg, [fieldKey]: value } : msg)));

  const updateCh = (msgIndex: number, chIndex: number, value: string) =>
    setDraftMessages((prev) =>
      prev.map((msg, idx) =>
        idx === msgIndex ? { ...msg, ch: msg.ch.map((char, k) => (k === chIndex ? value : char)) } : msg,
      ),
    );

  const addMessage = () => setDraftMessages((prev) => [...prev, { who: '', title: '', message: '', ch: [] }]);
  const removeMessage = (index: number) => setDraftMessages((prev) => prev.filter((_, idx) => idx !== index));

  const handleSave = () =>
    saveTranslation({
      blockId,
      lang,
      originalContent: { ...content, messages },
      draftContent: { ...draftContent, messages: draftMessages },
      setSaving,
      successMessage: 'Sección Mensajes guardada',
      router,
      supabase,
    });

  return (
    <section id="mensajes" className="py-20 md:py-28 bg-page transition-colors duration-300">
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
        </header>

        <EditableArray
          items={draftMessages.map((msg, index) => ({ id: `m-${index}`, value: msg }))}
          onReorder={setDraftMessages}
          onAdd={addMessage}
          onRemove={(id) => removeMessage(parseInt(id.split('-')[1], 10))}
          addLabel="+ Añadir mensaje"
          emptyHint="Sin mensajes. Pulsa 'Añadir' para empezar."
          renderItem={(msg, index) => (
            <div className="rounded-xl border border-dashed border-accent/30 bg-card/50 p-4">
              <EditableText
                value={msg.who}
                onChange={(value) => updateMessage(index, 'who', value)}
                placeholder="Quién"
                ariaLabel={`Quién mensaje ${index + 1}`}
                className="text-xs text-muted uppercase tracking-widest mb-1"
              />
              <EditableText
                value={msg.title}
                onChange={(value) => updateMessage(index, 'title', value)}
                placeholder="Título"
                ariaLabel={`Título mensaje ${index + 1}`}
                className="font-sans font-semibold text-main text-base mb-2"
              />
              <EditableText
                value={msg.message}
                onChange={(value) => updateMessage(index, 'message', value)}
                placeholder="Mensaje"
                ariaLabel={`Mensaje ${index + 1}`}
                multiline
                className="text-sm text-body leading-relaxed mb-2"
              />
              <div className="space-y-1">
                {msg.ch.map((char, chIndex) => (
                  <EditableText
                    key={chIndex}
                    value={char}
                    onChange={(value) => updateCh(index, chIndex, value)}
                    placeholder={`Característica ${chIndex + 1}`}
                    ariaLabel={`Característica ${chIndex + 1} mensaje ${index + 1}`}
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
                💾 Guardar sección Mensajes
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
