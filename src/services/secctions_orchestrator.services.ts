import { getContent } from "./sections/content.service";

export const getSectionData = async (lang: string = 'es') => {
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
        getContent('home_hero_section', lang),
        getContent('home_differentiator_section', lang),
        getContent('home_personas_section', lang),
        getContent('home_ipmmethod_section', lang),
        getContent('home_ipmscore_section', lang),
        getContent('home_messages_section', lang),
        getContent('home_servicesdesks_section', lang),
        getContent('home_trackrecord_section', lang),
        getContent('home_ethics_section', lang),
        getContent('home_academy_section', lang),
        getContent('home_cta_section', lang),
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