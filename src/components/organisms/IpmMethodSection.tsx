import { FadeUp } from '../animations/Animations';
import { ArrowRight } from 'lucide-react';
import { IpmMethodCard, Paragraph, Span, Title2 } from '../server-components';
import { IpmMethodProps } from '../types';

export function IpmMethodSection({ content, article }: IpmMethodProps) {
  return (
    <section id="metodo" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LADO IZQUIERDO: Sticky Content */}
          <FadeUp>
            <header className="flex flex-col gap-5 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent-soft border border-accent/20 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <Span 
                  className="text-[11px] tracking-widest uppercase text-accent font-semibold" 
                  txt={content.minititle} 
                />
              </div>

              <Title2 
                className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" 
                txt={content.title} 
              />

              <Paragraph 
                className="text-base md:text-lg text-body leading-relaxed max-w-lg" 
                txt={content.paragraph} 
              />

              <div className="mt-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-alt text-page text-sm font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {content.button}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </header>
          </FadeUp>

          {/* LADO DERECHO: Pasos del Método */}
          <ol className="flex flex-col" role="list">
            {article.map((step, index) => (
              <li key={index} role="listitem">
                <IpmMethodCard content={step} delay={index * 0.15} index={index} />
              </li>
            ))}
            <div className="border-t border-border-subtle" aria-hidden="true" />
          </ol>

        </div>
      </div>
    </section>
  );
}
