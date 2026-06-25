import { FadeUp } from '../animations/Animations';
import { Paragraph, Span } from '../server-components';
import { ArticleProps } from '../types';

export function AcademyCard({ content, delay }: ArticleProps) {
  return (
    <FadeUp delay={delay}>
      <article className="rounded-lg group bg-card p-7 cursor-pointer transition-all duration-400 ease-out hover:-translate-y-1 h-full flex flex-col justify-between">

        <header>
          <Span className="uppercase text-accent-light! mb-3 block font-medium" txt={content.title} />
        </header>

        <Paragraph className="mb-5" txt={content.paragraph} />

        <footer className="mt-auto">
          <Span className="uppercase text-accent! border-b border-accent pb-0.5 transition-opacity group-hover:opacity-70 inline-block" txt={content.read} />
        </footer>

      </article>
    </FadeUp>
  )
}