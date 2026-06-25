import { getContent } from "./sections/content.service";

export const getCardsData = async (lang: string = 'es') => {
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
        getContent('differentiator_article', lang),
        getContent('personas_article', lang),
        getContent('ipmmethod_article', lang),
        getContent('ipmscore_statescard', lang),
        getContent('ipmscore_dimensions',lang),
        getContent('ipmscore_quote',lang),
        getContent('messages_messages',lang),
        getContent('servicesdesks_services',lang),
        getContent('trackrecord_sectors',lang),
        getContent('trackrecord_metrics',lang), 
        getContent('trackrecord_growth',lang),
        getContent('ethics_article',lang),
        getContent('academy_articles',lang),
        getContent('cta_form',lang),
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