export function NavbarSkeleton() {
  return (
    <header className="fixed top-0 w-full z-50 py-3.5 bg-page/80">
      <div className="max-w-7xl flex items-center justify-between content-container animate-pulse">
        
        {/* Logo Skeleton */}
        <div className="h-10 w-10 md:h-12 md:w-16 bg-gray-300 dark:bg-gray-700 rounded-sm" />

        {/* Links Navigation Skeleton */}
        <nav className="hidden lg:flex items-center gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          ))}
        </nav>

        {/* Acciones Skeleton */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-9 w-28 bg-gray-300 dark:bg-gray-700 rounded-sm" />
          <div className="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded-sm" />
        </div>

      </div>
    </header>
  );
}