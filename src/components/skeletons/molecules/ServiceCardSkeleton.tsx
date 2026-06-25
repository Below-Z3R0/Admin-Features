export function ServiceCardSkeleton() {
  return (
    <article className="rounded-lg flex flex-col justify-between bg-card p-8 h-full animate-pulse border border-border-subtle/50">
      <header>
        <div className="flex justify-between items-start mb-4.5">
          <div className="h-4 w-20 bg-border-mid rounded" /> {/* MiniTitle */}
          <div className="h-4 w-4 bg-border-mid rounded-full" /> {/* Icon */}
        </div>
        <div className="h-8 w-4/5 bg-border-mid rounded mb-5" /> {/* Title */}
      </header>
      
      <div className="space-y-2 mb-4.5">
        <div className="h-4 w-full bg-border-mid rounded" /> {/* Description */}
        <div className="h-4 w-1/2 bg-border-mid rounded" />
      </div>

      <footer className="mt-auto">
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-3/4 bg-border-mid rounded" />
          ))}
        </div>
      </footer>
    </article>
  );
}