export function EthicCardSkeleton() {
  return (
    <article className="rounded-lg bg-card p-6.5 h-full animate-pulse border border-border-subtle/50">
      <div className="h-8 w-10 bg-border-mid rounded mb-2.5" /> {/* Número */}
      <header>
        <div className="h-4 w-1/2 bg-border-mid rounded mb-2" /> {/* Título */}
      </header>
      <div className="space-y-2 mt-4">
        <div className="h-3 w-full bg-border-mid rounded" /> {/* Párrafo */}
        <div className="h-3 w-4/5 bg-border-mid rounded" />
      </div>
    </article>
  );
}