export function AcademyCardSkeleton() {
  return (
    <article className="rounded-lg bg-card p-7 h-full flex flex-col justify-between animate-pulse border border-border-subtle/50">
      <header>
        <div className="h-4 w-24 bg-border-mid rounded mb-3" /> {/* Title */}
      </header>

      <div className="space-y-2 mb-5">
        <div className="h-4 w-full bg-border-mid rounded" /> {/* Paragraph */}
        <div className="h-4 w-full bg-border-mid rounded" />
        <div className="h-4 w-3/4 bg-border-mid rounded" />
      </div>

      <footer className="mt-auto">
        <div className="h-4 w-20 bg-border-mid rounded" /> {/* Read */}
      </footer>
    </article>
  );
}