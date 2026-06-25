export function TrackRecordMetricsCardSkeleton() {
  return (
    <div className="py-1 animate-pulse">
      <div className="flex justify-between items-baseline mb-1.5">
        <div className="h-10 w-20 bg-border-mid rounded" />
        <div className="h-4 w-32 bg-border-mid rounded" />
      </div>
      <div className="h-2 w-full bg-border-mid rounded" />
    </div>
  );
}
