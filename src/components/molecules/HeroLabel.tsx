import { Span } from "../atoms/Span";
import { Button, } from "../server-components";
import { HeroLabelProps } from "../types";

export function HeroLabel({content}: HeroLabelProps) {
  return (
    <Button
      className="rounded-xl group cursor-pointer flex justify-between w-full items-center bg-card px-4 py-3 border border-border-subtle hover:border-accent hover:text-accent uppercase tracking-widest transition-all duration-300"
    >
      <Span txt={content}/>
      <Span className="text-muted group-hover:text-accent transition-colors duration-300" txt="→" />
    </Button>
  )
}