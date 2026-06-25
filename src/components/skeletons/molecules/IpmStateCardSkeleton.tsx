export function IpmStateCardSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 bg-card rounded-lg animate-pulse">
      <div className="h-4 w-12 bg-border-mid rounded" />
      <div className="h-4 w-22.5 bg-border-mid rounded" />
      <div className="h-4 flex-1 bg-border-mid rounded" />
    </div>
  );
}