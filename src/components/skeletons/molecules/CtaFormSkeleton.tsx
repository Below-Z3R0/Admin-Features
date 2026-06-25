export function CtaFormSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-0 w-full max-w-107.5 mx-auto animate-pulse">
      {/* Input Placeholder */}
      <div className="flex-1 px-4 py-3.5 bg-surface rounded-lg sm:rounded-r-none border border-border-subtle" />
      {/* Button Placeholder */}
      <div className="px-8 py-3.5 bg-border-mid rounded-lg sm:rounded-l-none" />
    </div>
  );
}