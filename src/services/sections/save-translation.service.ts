'use client';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';
import { mergeWithFallback } from '@/components-admin/editable-components/utils/mergeWithFallback';

export interface SaveTranslationParams<T> {
  blockId: string;
  lang: string;
  originalContent: T;
  draftContent: T;
  setSaving: (saving: boolean) => void;
  successMessage: string;
  router: AppRouterInstance;
  supabase: SupabaseClient;
}

export interface SaveResult {
  success: boolean;
  error?: string;
}

export async function saveTranslation<T>({
  blockId,
  lang,
  originalContent,
  draftContent,
  setSaving,
  successMessage,
  router,
  supabase,
}: SaveTranslationParams<T>): Promise<SaveResult> {
  setSaving(true);
  try {
    const merged = mergeWithFallback(originalContent, draftContent);

    const { error } = await supabase
      .from('translations')
      .update({ content: merged })
      .eq('block_id', blockId)
      .eq('lang_code', lang);

    if (error) {
      toast.error(`Error al guardar: ${error.message}`);
      return { success: false, error: error.message };
    }

    toast.success(successMessage);
    router.refresh();
    return { success: true };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    toast.error(`Error inesperado: ${error.message}`);
    return { success: false, error: error.message };
  } finally {
    setSaving(false);
  }
}
