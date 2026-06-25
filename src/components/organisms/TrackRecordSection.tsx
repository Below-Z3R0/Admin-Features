import { FadeUp } from '../animations/Animations';
import { TrendingUp } from 'lucide-react';
import { MiniTitle, Paragraph, Span, TrackRecordMetricsCard, TrackRecordSectorCard } from '../server-components';
import { TrackRecordProps } from '../types';

export function TrackRecordSection({ content, metrics, sectors, growth }: TrackRecordProps) {
  return (
    <section id="track" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <FadeUp>
            <MiniTitle content={content.minititle} />
          </FadeUp>
        </header>

        <FadeUp delay={0.05}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* LADO IZQUIERDO: Métricas con Barras Animadas */}
            <article className="rounded-xl border border-border-mid bg-card/50 backdrop-blur-sm p-6 md:p-8 h-full transition-colors duration-300">

              <header className="mb-6">
                <Span 
                  className="uppercase text-[11px] tracking-widest text-accent font-semibold block" 
                  txt={metrics.title} 
                />
              </header>

              <div className="space-y-5" role="list" aria-label="Metricas">
                {metrics.card.map((metric, index) => (
                  <div key={index} role="listitem">
                    <TrackRecordMetricsCard content={metric} delay={index * 0.14} />
                  </div>
                ))}
              </div>
            </article>

            {/* LADO DERECHO: Sectores y Crecimiento */}
            <div className="flex flex-col gap-4">

              {/* Bloque de Sectores */}
              <article className="rounded-xl border border-border-mid bg-main text-page p-6 md:p-8 flex-1 transition-colors duration-300">

                <header className="mb-4">
                  <Span 
                    className="uppercase text-[11px] tracking-widest text-accent-light font-semibold block" 
                    txt={sectors.title} 
                  />
                </header>

                <div className="space-y-2.5" role="list" aria-label="Sectores de especialización">
                  {sectors.card.map((sector, index) => (
                    <div key={index} role="listitem">
                      <TrackRecordSectorCard content={sector} index={index} />
                    </div>
                  ))}
                </div>
                <footer className="mt-5 pt-4 border-t border-page/10">
                  <Paragraph 
                    className="opacity-90 text-sm text-page" 
                    txt={sectors.paragraph} 
                  />
                </footer>

              </article>

              {/* Bloque de Crecimiento */}
              <div className="rounded-xl border border-border-mid bg-card/50 backdrop-blur-sm p-6 md:p-8 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-md bg-accent-soft flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  <Span 
                    className="uppercase text-[11px] tracking-widest text-accent font-semibold" 
                    txt={growth.minititle} 
                  />
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <Span 
                    className="text-5xl font-sans font-bold text-main tracking-tight" 
                    txt={growth.percentage} 
                  />
                  <Span 
                    className="text-sm text-body" 
                    txt={growth.years} 
                  />
                </div>
                <Paragraph 
                  className="text-sm text-body leading-relaxed" 
                  txt={growth.paragraph} 
                />

              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
