import { ServiceCardSkeleton } from "../../scheletons";

export function ServicesDesksSectionSkeleton() {
  return (
    <section className="py-20 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-10 animate-pulse">
          <div className="h-4 w-32 bg-border-mid rounded mb-3" />
          <div className="h-12 w-64 bg-border-mid rounded mb-3" />
          <div className="h-20 w-full max-w-120 bg-border-mid rounded" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1" role="list">
          {[1, 2, 3].map((i) => (
            <div key={i} role="listitem" className="size-full">
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}