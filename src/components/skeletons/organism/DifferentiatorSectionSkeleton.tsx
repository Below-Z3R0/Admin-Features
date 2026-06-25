import { DiferentiatorsCardSkeleton, DifferentiatorMetricsCardSkeleton } from "../../scheletons";

export function DifferentiatorSectionSkeleton() {
  return (
    <section className="bg-page py-20 transition-colors duration-300">
      <div className="max-w-7xl content-container">
        {/* Header Skeleton */}
        <div className="h-4 w-32 bg-border-mid rounded mb-4" />

        <div className="grid grid-cols-1 lg:grid-cols-2 p-9 gap-15 lg:gap-5 rounded-4xl bg-surface mt-2">
          
          {/* LADO IZQUIERDO */}
          <div className="flex flex-col justify-between min-h-full">
            <div>
              <div className="h-10 w-48 bg-border-mid rounded-lg mb-4" />
              <div className="h-12 w-full max-w-130 bg-border-mid rounded mb-8" />
              <div className="h-20 w-full max-w-130 bg-border-mid rounded" />
            </div>

            {/* Métricas Skeleton */}
            <div className="flex flex-col gap-5 mt-10">
              {[1, 2, 3].map((i) => (
                <DifferentiatorMetricsCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <DiferentiatorsCardSkeleton key={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}