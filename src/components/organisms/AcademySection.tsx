import { FadeUp } from '../animations/Animations';
import { AcademyCard, MiniTitle, Title2 } from '../server-components';
import { AcademyProps } from '../types';

export function AcademySection({ content, articles }: AcademyProps) {
  return (
    <section id="academy" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <FadeUp>
            <MiniTitle content={content.minititle} />
          </FadeUp>

          <FadeUp delay={0.06}>
            <Title2 
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" 
              txt={content.title} 
            />
          </FadeUp>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <AcademyCard key={index} content={article} delay={index * 0.07} />
          ))}
        </div>

      </div>
    </section>
  );
}
