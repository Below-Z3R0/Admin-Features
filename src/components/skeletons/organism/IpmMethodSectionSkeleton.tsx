import { IpmMethodCardSkeleton } from "../../scheletons";

export function IpmMethodSectionSkeleton() {
  return (
    <section className="py-20 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-15 justify-between">
          
          {/* LADO IZQUIERDO: Sticky Content */}
          <header className="flex flex-col h-full gap-5 animate-pulse">
            <div className="h-8 w-40 bg-border-mid rounded-lg mb-4.5" />
            <div className="h-12 w-full bg-border-mid rounded mt-15" />
            <div className="h-32 w-full bg-border-mid rounded mb-20" />
            <div className="h-12 w-80 bg-border-mid rounded-lg" />
          </header>

          {/* LADO DERECHO: Lista de Skeletons */}
          <ol className="flex flex-col" role="list">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} role="listitem">
                <IpmMethodCardSkeleton />
              </li>
            ))}
            <div className="border-t border-border-subtle" aria-hidden="true" />
          </ol>

        </div>
      </div>
    </section>
  );
}