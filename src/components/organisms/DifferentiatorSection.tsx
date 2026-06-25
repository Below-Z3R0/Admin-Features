import { FadeUp } from '../animations/Animations';
import { X } from 'lucide-react';
import { DiferentiatorsCard, DifferentiatorMetricsCard, MiniTitle, Paragraph, Title2 } from '../server-components';
import { DifferentiatorProps } from '../types';

export function DifferentiatorSection({ content, diferentiators, metrics }: DifferentiatorProps) {
  return (
    <section className="bg-page py-20 md:py-28 transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <FadeUp>
            <MiniTitle content={content.minititle} />
          </FadeUp>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-8 rounded-xl border border-border-mid bg-card/50 backdrop-blur-sm">

          {/* LADO IZQUIERDO */}
          <div className="flex flex-col justify-between gap-8 transition-colors duration-300">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 px-3 py-1.5 rounded-md mb-5">
                <X className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-main">{content.subtitle}</span>
              </div>
              <Title2 
                className="mt-2 mb-6 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" 
                txt={content.title} 
              />
              <Paragraph 
                className="text-base md:text-lg text-body leading-relaxed max-w-xl" 
                txt={content.paragraph} 
              />
            </div>

            {/* Métricas */}
              <div className="flex flex-col gap-4" role="list" aria-label="Métricas de diferenciación">
                {metrics.map((metric, index) => (
                  <div key={index} role="listitem">
                    <DifferentiatorMetricsCard content={metric} />
                  </div>
                ))}
              </div>
          </div>

          {/* LADO DERECHO */}
          <div className="flex flex-col gap-3" role="list" aria-label="Lista de diferenciadores">
            {diferentiators.map((diferentiator, index) => (
              <div key={index} role="listitem">
                <DiferentiatorsCard delay={index * 0.08} content={diferentiator} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
