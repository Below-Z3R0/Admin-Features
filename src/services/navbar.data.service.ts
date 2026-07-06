import { createClient } from "@/utils/supabase/server"
import { getContent } from "./sections/content.service"

export const getNavbarData = async (lang: string = 'es') => {
    const supabase = await createClient();
    const Navbar = await getContent(supabase, 'navbar', lang)
    return Navbar
}
