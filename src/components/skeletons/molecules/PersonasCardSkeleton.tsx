export function PersonasCardSkeleton({ index }: { index: number }) {
  return (
    <article className="bg-surface p-6.5 min-h-55 rounded-lg h-full animate-pulse border border-border-subtle">
      <header>
        <div className="h-8 w-8 bg-border-mid rounded mb-2.5" />
        <div className="h-5 w-3/4 bg-border-mid rounded mb-2" />
      </header>
      
      <div className="space-y-2 mt-4">
        <div className="h-4 w-full bg-border-mid rounded" />
        <div className="h-4 w-full bg-border-mid rounded" />
        <div className="h-4 w-2/3 bg-border-mid rounded" />
      </div>
    </article>
  );
}