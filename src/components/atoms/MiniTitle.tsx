import { MiniTitleAnimation } from "../animations/Animations";
import { Title5 } from "./Title5";

export function MiniTitle({ content }: { content: string }) {
  return (
    <MiniTitleAnimation >
      <Title5 className="text-accent-light! uppercase" txt={content} />
    </MiniTitleAnimation>
  );
}