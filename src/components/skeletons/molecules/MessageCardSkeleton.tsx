export function MessageCardSkeleton() {
  return (
    <article className="rounded-lg flex flex-col justify-between bg-card p-7 h-full animate-pulse border border-border-subtle/50">
      <div className="flex flex-col gap-5">
        <div className="h-4 w-20 bg-border-mid rounded" /> {/* Who */}
        <div className="h-6 w-3/4 bg-border-mid rounded" /> {/* Title */}
        <div className="space-y-2 mt-2">
          <div className="h-4 w-full bg-border-mid rounded" />
          <div className="h-4 w-full bg-border-mid rounded" />
          <div className="h-4 w-2/3 bg-border-mid rounded" />
        </div>
      </div>
      <footer className="flex gap-1.5 mt-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-16 bg-surface rounded" />
        ))}
      </footer>
    </article>
  );
}