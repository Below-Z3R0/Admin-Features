import { PersonasCardSkeleton } from "../../scheletons";

export function PersonasSectionSkeleton() {
  return (
    <section className="py-20 bg-page animate-pulse transition-colors duration-300">
      <div className="max-w-7xl content-container">
        
        {/* Header Skeleton */}
        <header className="mb-10">
          <div className="h-4 w-32 bg-border-mid rounded mb-4" />
          <div className="h-12 w-64 bg-border-mid rounded" />
        </header>

        {/* Grid utilizando el Card Skeleton integrado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <PersonasCardSkeleton key={i} index={i} />
          ))}
        </div>
        
      </div>
    </section>
  );
}