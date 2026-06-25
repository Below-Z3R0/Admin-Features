import { createClient } from "@/utils/supabase/server";

export const getContent = async (section: string, language: string = 'es') => {
    const supabase = await createClient();
    
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