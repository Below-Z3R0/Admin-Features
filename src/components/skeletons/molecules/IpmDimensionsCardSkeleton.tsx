export function IpmDimensionsCardSkeleton() {
  return (
    <div className="flex items-center gap-3 py-1 animate-pulse">
      <div className="h-4 w-22.5 bg-border-mid rounded" />
      <div className="h-4 flex-1 bg-border-mid rounded" />
      <div className="h-4 w-7.5 bg-border-mid rounded" />
    </div>
  );
}