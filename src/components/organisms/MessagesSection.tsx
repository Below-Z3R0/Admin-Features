import { FadeUp } from '../animations/Animations';
import { MessageCard, MiniTitle, Title2 } from '../server-components';
import { MessagesProps } from '../types';

export function MessagesSection({ content, messages }: MessagesProps) {
  return (
    <section className="py-20 md:py-28 bg-page transition-colors duration-300">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
          {messages.map((message, index) => (
            <div key={index} role="listitem" className="size-full">
              <MessageCard
                content={message}
                delay={index * 0.08}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
