import 'server-only';
import { createClient } from '@/utils/supabase/server';

export async function isCurrentUserAdmin(): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  // maybeSingle() distinguishes "no row" from real errors (PGRST116).
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (error || !profile) {
    return false;
  }

  return profile.role === 'admin';
}

export async function getBlockIdByKey(blockKey: string): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('content_blocks')
    .select('id')
    .eq('key', blockKey)
    .maybeSingle();

  if (error || !data) {
    throw new Error(
      `No se encontró content_block con key='${blockKey}'. ` +
        `Error original: ${error?.message ?? 'sin datos'}`,
    );
  }

  return data.id;
}
