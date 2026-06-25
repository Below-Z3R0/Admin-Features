import { FadeUp } from '../animations/Animations';
import { Quote } from 'lucide-react';
import { IpmDimensionsCard, IpmStateCard, MiniTitle, Paragraph, Span, Title2 } from '../server-components';
import { IpmScoreProps } from '../types';

export function IpmScoreSection({ content, statescard, dimensions, quote }: IpmScoreProps) {
  return (
    <section id="score" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <FadeUp>
            <MiniTitle content={content.minititle} />
          </FadeUp>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">

          {/* LADO IZQUIERDO: Rangos y Niveles */}
          <FadeUp delay={0.08}>
            <Title2 
              className="mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" 
              txt={content.title} 
            />

            <Paragraph 
              className="text-base text-body leading-relaxed mb-8 max-w-md" 
              txt={content.description} 
            />

            <div className="flex flex-col gap-2">
              {statescard.map((state, index) => (
                <IpmStateCard key={index} content={state} />
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.16} className='h-full'>
            <article className='flex flex-col justify-between h-full pt-2 gap-8'>
              <div>
                <header>
                  <Span 
                    className="uppercase text-[11px] tracking-widest text-muted font-semibold mb-4 block" 
                    txt={dimensions.minititle} 
                  />
                </header>

                <div className="flex flex-col gap-3" role="list" aria-label="Dimensiones del Score">
                  {dimensions.card.map((item, index) => (
                    <div className="size-full" key={index} role="listitem">
                      <IpmDimensionsCard content={item} delay={index * 0.14} />
                    </div>
                  ))}
                </div>
              </div>

              <footer className="relative p-5 rounded-lg border border-accent/30 bg-accent-soft backdrop-blur-sm">
                <Quote className="w-5 h-5 text-accent mb-2 opacity-70" />
                <blockquote className="space-y-2">
                  <Span
                    className="font-sans font-semibold text-main block text-sm"
                    txt={quote.title}
                  />
                  <cite className="not-italic block">
                    <Paragraph
                      className="text-muted text-xs tracking-wide italic"
                      txt={`"${quote.paragraph}"`}
                    />
                  </cite>
                </blockquote>
              </footer>

            </article>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
