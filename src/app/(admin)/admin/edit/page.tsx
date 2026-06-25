import { getSectionData } from '@/services/secctions_orchestrator.services';
import { getCardsData } from '@/services/cards_orchestrator.service';
import { createClient } from '@/utils/supabase/server';
import {
  HeroSectionEditable,
  DifferentiatorSectionEditable,
  PersonasSectionEditable,
  IpmMethodSectionEditable,
  IpmScoreSectionEditable,
  MessagesSectionEditable,
  ServicesDesksSectionEditable,
  TrackRecordSectionEditable,
  EthicsSectionEditable,
  AcademySectionEditable,
  CtaSectionEditable,
} from '@/components-admin/editable-components';

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

const EDITABLE_BLOCK_KEYS = [
  'home_hero_section',
  'home_differentiator_section',
  'differentiator_article',
  'trackrecord_metrics',
  'home_personas_section',
  'home_ipmmethod_section',
  'home_ipmscore_section',
  'ipmscore_statescard',
  'ipmscore_dimensions',
  'ipmscore_quote',
  'home_messages_section',
  'home_servicesdesks_section',
  'home_trackrecord_section',
  'trackrecord_sectors',
  'trackrecord_growth',
  'home_ethics_section',
  'home_academy_section',
  'home_cta_section',
  'cta_form',
] as const;

export default async function AdminEditPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const lang = resolvedParams.lang || 'es';
  const data = await getSectionData(lang);
  const cardsdata = await getCardsData(lang);
  const supabase = await createClient();
  const { data: blocksData, error: blocksError } = await supabase
    .from('content_blocks')
    .select('id, key')
    .in('key', [...EDITABLE_BLOCK_KEYS]);

  if (blocksError || !blocksData) {
    throw new Error(`Error al buscar content_blocks: ${blocksError?.message}`);
  }

  const blockIdByKey: Record<string, string> = Object.fromEntries(
    blocksData.map((b: { id: string; key: string }) => [b.key, b.id]),
  );
  return (
    <main className="flex flex-col">
      <HeroSectionEditable
        content={data.heroData}
        blockId={blockIdByKey['home_hero_section']}
        lang={lang}
      />

      <DifferentiatorSectionEditable
        content={data.differentiatorData}
        diferentiators={cardsdata.DiffMetricData.card}
        metrics={cardsdata.TrckRcrdMetricsData.card}
        blockIds={{
          header: blockIdByKey['home_differentiator_section'],
          cards: blockIdByKey['differentiator_article'],
          metrics: blockIdByKey['trackrecord_metrics'],
        }}
        lang={lang}
      />

      <PersonasSectionEditable
        content={data.personasData}
        card={cardsdata.PersonCardData.card}
        blockId={blockIdByKey['home_personas_section']}
        lang={lang}
      />

      <IpmMethodSectionEditable
        content={data.ipmMethodData}
        article={cardsdata.IpmMthdArticleData.card}
        blockId={blockIdByKey['home_ipmmethod_section']}
        lang={lang}
      />

      <IpmScoreSectionEditable
        content={data.ipmScoreData}
        statescard={cardsdata.IpmScrStatesCardsData.card}
        dimensions={cardsdata.IpmScrDimensions.dimensions}
        quote={cardsdata.IpmScrQuote}
        blockIds={{
          content: blockIdByKey['home_ipmscore_section'],
          statescard: blockIdByKey['ipmscore_statescard'],
          dimensions: blockIdByKey['ipmscore_dimensions'],
          quote: blockIdByKey['ipmscore_quote'],
        }}
        lang={lang}
      />

      <MessagesSectionEditable
        content={data.messagesData}
        messages={cardsdata.MssgMessagesData.card}
        blockId={blockIdByKey['home_messages_section']}
        lang={lang}
      />

      <ServicesDesksSectionEditable
        content={data.servicesDeskData}
        card={cardsdata.ServiceDskCardData.card}
        blockId={blockIdByKey['home_servicesdesks_section']}
        lang={lang}
      />

      <TrackRecordSectionEditable
        content={data.trackRecordData}
        sectors={cardsdata.TrckRcrdSectorsData}
        metrics={cardsdata.TrckRcrdMetricsData}
        growth={cardsdata.TrcRcrdGrowhtData}
        blockIds={{
          content: blockIdByKey['home_trackrecord_section'],
          metrics: blockIdByKey['trackrecord_metrics'],
          sectors: blockIdByKey['trackrecord_sectors'],
          growth: blockIdByKey['trackrecord_growth'],
        }}
        lang={lang}
      />

      <EthicsSectionEditable
        content={data.ethicsData}
        article={cardsdata.EthcArticleData.card}
        blockId={blockIdByKey['home_ethics_section']}
        lang={lang}
      />

      <AcademySectionEditable
        content={data.academyData}
        articles={cardsdata.AcademyArticlesData.card}
        blockId={blockIdByKey['home_academy_section']}
        lang={lang}
      />

      <CtaSectionEditable
        content={data.ctaData}
        form={cardsdata.CtaFormData}
        blockId={blockIdByKey['home_cta_section']}
        lang={lang}
      />
    </main>
  );
}
