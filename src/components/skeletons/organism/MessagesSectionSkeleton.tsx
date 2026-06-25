import { MessageCardSkeleton } from "../../scheletons";
export function MessagesSectionSkeleton() {
  return (
    <section className="py-20 bg-page transition-colors duration-300 animate-pulse">
      <div className="max-w-7xl content-container">
        <header>
          <div className="h-4 w-32 bg-border-mid rounded mb-4" />
          <div className="h-12 w-64 bg-border-mid rounded mb-10" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1" role="list">
          {[1, 2, 3].map((i) => (
            <div key={i} role="listitem" className="size-full">
              <MessageCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}