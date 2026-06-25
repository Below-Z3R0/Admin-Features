import { TrackRecordMetricsCardSkeleton, TrackRecordSectorCardSkeleton } from "../../scheletons";

export function TrackRecordSectionSkeleton() {
  return (
    <section className="py-20 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container animate-pulse">
        <div className="h-4 w-32 bg-border-mid rounded mb-4" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-2">
          {/* LADO IZQUIERDO */}
          <article className="bg-card rounded-bl-2xl rounded-tl-2xl p-8 h-full">
            <div className="h-4 w-24 bg-border-mid rounded mb-7" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => <TrackRecordMetricsCardSkeleton key={i} />)}
            </div>
          </article>

          {/* LADO DERECHO */}
          <div className="flex flex-col gap-0.5">
            <article className="rounded-tr-2xl bg-accent p-7 flex-1">
              <div className="h-4 w-24 bg-page/25 rounded mb-3.5" />
              <div className="space-y-2.5 mb-5">
                {[1, 2, 3].map((i) => <TrackRecordSectorCardSkeleton key={i} />)}
              </div>
              <div className="h-12 w-full bg-page/10 rounded mt-5" />
            </article>

            <div className="rounded-br-2xl bg-surface p-7 border-t-2 border-accent-light">
              <div className="h-4 w-20 bg-border-mid rounded mb-2.5" />
              <div className="h-12 w-40 bg-border-mid rounded mb-2" />
              <div className="h-16 w-full bg-border-mid rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}