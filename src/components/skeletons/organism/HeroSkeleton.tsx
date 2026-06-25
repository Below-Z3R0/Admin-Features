export function HeroSectionSkeleton() {
  return (
    <section className="grid grid-cols-1 justify-center items-start bg-page min-h-screen pt-24 md:pt-60 px-6 md:px-12 animate-pulse">
      
      {/* Contenedor Principal: Ajuste responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-12 lg:gap-8 items-start w-full max-w-7xl mx-auto">
        
        {/* Columna Izquierda: Títulos */}
        <header className="flex flex-col gap-6 md:gap-10 w-full">
          <div className="h-4 w-24 bg-gray-200 rounded" /> {/* MiniTitle */}
          <div className="h-20 w-full md:w-[90%] bg-gray-200 rounded-sm mt-4 md:mt-10" /> {/* Title1 */}
          <div className="h-16 w-3/4 bg-gray-200 rounded-sm" /> {/* Title2 */}
        </header>

        {/* Columna Derecha: Descripción y Tarjeta */}
        <div className="flex flex-col gap-6 md:gap-5 w-full max-w-lg">
          <div className="h-16 w-full bg-gray-200 rounded" /> {/* Paragraph */}
          <div className="h-16 w-full bg-gray-200 rounded mt-4 md:mt-10 border-l-2 border-gray-300" /> {/* Promise */}
          
          <ul className="flex flex-col gap-2.5 mt-2">
            {[1, 2, 3].map((i) => (
              <li key={i} className="h-8 w-full bg-gray-200 rounded" />
            ))}
          </ul>
        </div>
      </div>

      {/* Footer del Hero */}
      <div className="hidden md:flex flex-col items-center justify-center w-full max-w-7xl mx-auto mt-20">
        <div className="h-px bg-gray-200 w-full" />
        <div className="flex gap-8 mt-4 flex-wrap w-full justify-center lg:justify-start">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-24 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </section>
  );
}