export function DiferentiatorsCardSkeleton() {
  return (
    <article className="flex flex-col rounded-3xl p-4 bg-hover border border-transparent animate-pulse h-40 w-full">
      <header className="flex flex-col gap-3 mb-3">
        <div className="h-3 w-16 bg-border-mid rounded" />
        <div className="h-6 w-3/4 bg-border-mid rounded" />
      </header>
      <div className="h-10 w-full bg-border-mid rounded" />
    </article>
  );
}