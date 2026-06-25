import { AnimBar } from "../animations/Animations";
import { Span } from "../server-components";
import { IpmDimensionsCardProps } from "../types";

export function IpmDimensionsCard({ content, delay }: IpmDimensionsCardProps) {
  return (
    <div
      className="flex items-center gap-3 py-1"
      role="progressbar"
      aria-valuenow={20}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Dimensión: ${content}`}
    >
      <Span className="text-muted min-w-22.5" txt={content} />

      <div className="flex-1">
        <AnimBar pct={100} delay={delay} />
      </div>

      <Span className="text-accent-light min-w-7.5 text-right" txt="20%" />

    </div>
  )
}