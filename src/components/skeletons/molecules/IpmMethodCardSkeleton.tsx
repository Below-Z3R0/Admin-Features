export function IpmMethodCardSkeleton() {
  return (
    <article className="border-t border-border-subtle py-5.5 flex gap-4.5 items-start animate-pulse">
      {/* Indicador numérico */}
      <div className="h-6 w-8 bg-border-mid rounded" />

      <div className="flex-1 space-y-3">
        <header>
          <div className="h-5 w-1/3 bg-border-mid rounded mb-1.5" />
        </header>
        {/* Descripción */}
        <div className="h-4 w-full bg-border-mid rounded" />
        <div className="h-4 w-4/5 bg-border-mid rounded" />
        {/* Footer */}
        <div className="h-3 w-1/4 bg-border-mid rounded mt-2" />
      </div>
    </article>
  );
}