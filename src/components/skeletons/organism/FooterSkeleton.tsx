export function FooterSkeleton() {
  return (
    <footer className="w-full py-7.5 border-t border-border-subtle bg-card animate-pulse">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Grid superior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 items-start">
          
          {/* Logo & Description Skeleton */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-16 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-40 bg-gray-300 dark:bg-gray-700 rounded mt-3" />
          </div>

          {/* Slogan Skeleton */}
          <div className="flex justify-center">
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          {/* Quick Links Skeleton */}
          <div className="flex flex-col items-center md:items-end gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>

        {/* Bottom Legal Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-border-subtle gap-4">
          <div className="flex gap-4">
            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-3 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        
      </div>
    </footer>
  );
}