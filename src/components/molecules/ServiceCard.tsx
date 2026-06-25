import { Paragraph, Span, Title3, Title4 } from '../server-components';
import { ServiceCardProps } from '../types';

export function ServiceCard({ content, delay }: ServiceCardProps) {
  const Icon = content.icon;

  return (
    <article className="rounded-lg flex flex-col justify-between group relative bg-card p-8 overflow-hidden cursor-pointer transition-transform duration-400 ease-out hover:-translate-y-1 h-full">
      <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 transition-all duration-500 ease-out group-hover:w-full" />

      <header>

        <div className="flex justify-between items-start mb-4.5">
          <Title3 className="text-[16px]! uppercase text-accent! font-bold" txt={content.minititle} />
          {Icon && <Icon size={17} className="text-border-subtle transition-colors duration-300 group-hover:text-accent-light!" />}
        </div>

        <Span className="text-2xl! font-bold mb-5" txt={content.title} />

      </header>
      <Paragraph className="mb-4.5" txt={content.description} />

      <footer className="">
        <ul className="flex flex-col gap-1.5 mt-auto">
          {content.prods.map((prod) => (
            <li className="flex items-center gap-2" key={prod}>
              <div className="inline-block w-2.5 h-px bg-accent-light" />
              <Span className="text-[14px]! text-accent-light! flex items-center gap-1.5" txt={prod} />
            </li>
          ))}
        </ul>
      </footer>

    </article>

  );
}