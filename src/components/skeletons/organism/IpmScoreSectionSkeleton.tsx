import { IpmStateCardSkeleton, IpmDimensionsCardSkeleton } from "../../scheletons";
export function IpmScoreSectionSkeleton() {
  return (
    <section className="py-20 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-4">
          <div className="h-4 w-32 bg-border-mid rounded" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-20 items-start pt-8 animate-pulse">
          
          {/* LADO IZQUIERDO */}
          <div className="flex flex-col">
            <div className="h-10 w-64 bg-border-mid rounded mb-4" />
            <div className="h-20 w-full max-w-68.75 bg-border-mid rounded mb-10" />
            <div className="flex flex-col gap-1.5">
              {[1, 2, 3].map((i) => <IpmStateCardSkeleton key={i} />)}
            </div>
          </div>

          {/* LADO DERECHO */}
          <article className="flex flex-col justify-between h-full pt-2">
            <div>
              <div className="h-4 w-20 bg-border-mid rounded mb-4" />
              <div className="flex flex-col gap-4 mb-7">
                {[1, 2, 3, 4].map((i) => <IpmDimensionsCardSkeleton key={i} />)}
              </div>
            </div>
            
            {/* Quote Footer Skeleton */}
            <footer className="bg-accent-soft border-l-2 border-accent p-5.5 rounded-lg">
              <div className="space-y-2">
                <div className="h-5 w-full bg-border-mid rounded" />
                <div className="h-4 w-2/3 bg-border-mid rounded" />
              </div>
            </footer>
          </article>

        </div>
      </div>
    </section>
  );
}