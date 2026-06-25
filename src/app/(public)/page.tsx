import { getSectionData } from "@/services/secctions_orchestrator.services";
import { getCardsData } from "@/services/cards_orchestrator.service";
import {
  AcademySection, CtaSection, DifferentiatorSection, EthicsSection,
  HeroSection, IpmMethodSection, IpmScoreSection, MessagesSection,
  PersonasSection, ServicesDesksSection, TrackRecordSection
} from "@/components/server-components";

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentLang = resolvedParams.lang || 'es';
  const data = await getSectionData(currentLang);
  const cardsdata = await getCardsData(currentLang);
  return (
    <main className="flex flex-col">
      <HeroSection content={data.heroData} />

      <DifferentiatorSection
        content={data.differentiatorData}
        diferentiators={cardsdata.DiffMetricData.card}
        metrics={cardsdata.TrckRcrdMetricsData.card}
      />

      <PersonasSection
        content={data.personasData}
        card={cardsdata.PersonCardData.card}
      />

      <IpmMethodSection
        content={data.ipmMethodData}
        article={cardsdata.IpmMthdArticleData.card}
      />

      <IpmScoreSection
        content={data.ipmScoreData}
        statescard={cardsdata.IpmScrStatesCardsData.card}
        dimensions={cardsdata.IpmScrDimensions.dimensions}
        quote={cardsdata.IpmScrQuote}
      />

      <MessagesSection
        content={data.messagesData}
        messages={cardsdata.MssgMessagesData.card}
      />

      <ServicesDesksSection
        content={data.servicesDeskData}
        card={cardsdata.ServiceDskCardData.card}
      />

      <TrackRecordSection
        content={data.trackRecordData}
        sectors={cardsdata.TrckRcrdSectorsData}
        metrics={cardsdata.TrckRcrdMetricsData}
        growth={cardsdata.TrcRcrdGrowhtData}
      />

      <EthicsSection
        content={data.ethicsData}
        article={cardsdata.EthcArticleData.card}
      />

      <AcademySection
        content={data.academyData}
        articles={cardsdata.AcademyArticlesData.card}
      />

      <CtaSection
        content={data.ctaData}
        form={cardsdata.CtaFormData}
      />
    </main>
  );
}
