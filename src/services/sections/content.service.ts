import type { SupabaseClient } from "@supabase/supabase-js";

export const getContent = async (supabase: SupabaseClient, section: string, language: string = 'es') => {
    const { data, error } = await supabase
        .rpc('get_translation_by_key', { 
            block_key: section, 
            lang: language 
        });

    if (error){
        console.error(`Error de BD en ${section}:`, error.message);
        throw error;
    }
    return data; 
};