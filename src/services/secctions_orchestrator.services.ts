import { createClient } from "@/utils/supabase/server";
import { getContent } from "./sections/content.service";


export const getSectionData = async (lang: string = 'es') => {
    const supabase = await createClient()
    const [
        heroData,
        differentiatorData,
        personasData,
        ipmMethodData,
        ipmScoreData,
        messagesData,
        servicesDeskData,
        trackRecordData,
        ethicsData,
        academyData,
        ctaData
    ] = await Promise.all([
        getContent(supabase, 'home_hero_section', lang),
        getContent(supabase, 'home_differentiator_section', lang),
        getContent(supabase, 'home_personas_section', lang),
        getContent(supabase, 'home_ipmmethod_section', lang),
        getContent(supabase, 'home_ipmscore_section', lang),
        getContent(supabase, 'home_messages_section', lang),
        getContent(supabase, 'home_servicesdesks_section', lang),
        getContent(supabase, 'home_trackrecord_section', lang),
        getContent(supabase, 'home_ethics_section', lang),
        getContent(supabase, 'home_academy_section', lang),
        getContent(supabase, 'home_cta_section', lang),
    ]);
    return {
        heroData,
        differentiatorData,
        personasData,
        ipmMethodData,
        ipmScoreData,
        messagesData,
        servicesDeskData,
        trackRecordData,
        ethicsData,
        academyData,
        ctaData
    };
};