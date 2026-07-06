import { createClient } from "@/utils/supabase/server";
import { getContent } from "./sections/content.service";

export const getCardsData = async (lang: string = 'es') => {
    const supabase = await createClient();
    const [
        DiffMetricData,
        PersonCardData,
        IpmMthdArticleData,
        IpmScrStatesCardsData,
        IpmScrDimensions,
        IpmScrQuote,
        MssgMessagesData,
        ServiceDskCardData,
        TrckRcrdSectorsData,
        TrckRcrdMetricsData,
        TrcRcrdGrowhtData,
        EthcArticleData,
        AcademyArticlesData,
        CtaFormData
    ] = await Promise.all([
        getContent(supabase, 'differentiator_article', lang),
        getContent(supabase,'personas_article', lang),
        getContent(supabase,'ipmmethod_article', lang),
        getContent(supabase,'ipmscore_statescard', lang),
        getContent(supabase,'ipmscore_dimensions', lang),
        getContent(supabase,'ipmscore_quote', lang),
        getContent(supabase,'messages_messages', lang),
        getContent(supabase,'servicesdesks_services', lang),
        getContent(supabase,'trackrecord_sectors', lang),
        getContent(supabase,'trackrecord_metrics', lang),
        getContent(supabase,'trackrecord_growth', lang),
        getContent(supabase,'ethics_article', lang),
        getContent(supabase,'academy_articles', lang),
        getContent(supabase,'cta_form', lang),
    ])
    return {
        DiffMetricData,
        PersonCardData,
        IpmMthdArticleData,
        IpmScrStatesCardsData,
        IpmScrDimensions,
        IpmScrQuote,
        MssgMessagesData,
        ServiceDskCardData,
        TrckRcrdSectorsData,
        TrckRcrdMetricsData,
        TrcRcrdGrowhtData,
        EthcArticleData,
        AcademyArticlesData,
        CtaFormData
    }
}