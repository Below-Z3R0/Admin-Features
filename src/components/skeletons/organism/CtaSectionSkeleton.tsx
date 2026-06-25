import { CtaFormSkeleton } from "../../scheletons";

export function CtaSectionSkeleton() {
  return (
    <section className="py-22 text-center bg-page relative overflow-hidden transition-colors duration-300">
      <div className='max-w-7xl content-container relative animate-pulse'>
        
        <div className="max-w-7xl mx-auto px-12 flex flex-col items-center justify-center z-10">
          <header className="flex flex-col items-center justify-center gap-2.5 mb-4">
            <div className="w-10 h-px bg-border-mid" />
            <div className="h-4 w-32 bg-border-mid rounded" />
            <div className="w-10 h-px bg-border-mid" />
            <div className="h-12 w-64 bg-border-mid rounded mt-4" />
          </header>
          
          <div className="h-4 w-full max-w-97.5 bg-border-mid rounded mb-9" />

          {/* Formulario Skeleton */}
          <CtaFormSkeleton />

          <div className="h-3 w-40 bg-border-mid rounded mt-3.5" />
          <div className="h-3 w-48 bg-border-mid rounded mt-4" />
        </div>
        
      </div>
    </section>
  );
}