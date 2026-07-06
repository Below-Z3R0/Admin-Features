import { createClient } from "@/utils/supabase/server"
import { getContent } from "./sections/content.service"

export const getFooterData = async (lang: string = 'es') => {
    const supabase = await createClient();
    const Footer = await getContent(supabase, 'footer', lang)
    return Footer
}