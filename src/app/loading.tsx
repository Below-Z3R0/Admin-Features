import { AcademySectionSkeleton, CtaSectionSkeleton, DifferentiatorSectionSkeleton, EthicsSectionSkeleton, FooterSkeleton, HeroSectionSkeleton, IpmMethodSectionSkeleton, IpmScoreSectionSkeleton, MessagesSectionSkeleton, NavbarSkeleton, PersonasSectionSkeleton, ServicesDesksSectionSkeleton, TrackRecordSectionSkeleton } from "@/components/scheletons";

export default function Loading() {
  return (
    <>
      <NavbarSkeleton />
      <HeroSectionSkeleton />
      <DifferentiatorSectionSkeleton />
      <PersonasSectionSkeleton />
      <IpmMethodSectionSkeleton />
      <IpmScoreSectionSkeleton />
      <MessagesSectionSkeleton />
      <ServicesDesksSectionSkeleton />
      <TrackRecordSectionSkeleton />
      <EthicsSectionSkeleton />
      <AcademySectionSkeleton />
      <CtaSectionSkeleton />
      <FooterSkeleton />
    </>
  )
}