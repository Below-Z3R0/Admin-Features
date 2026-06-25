import { AnimBar } from "../animations/Animations";
import { Span } from "../server-components";
import { TrackRecordMetricsCardProps } from "../types";

export function TrackRecordMetricsCard({ content, delay }: TrackRecordMetricsCardProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={content.bar}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Métrica de desempeño: ${content.label}`}
      className="py-1"
    >
      <div className="flex justify-between items-baseline mb-1.5">
        <Span className="text-4xl! text-accent-light!" txt={content.value} />
        
        <Span className="text-muted! max-w-[50%]" txt={content.label} />
      </div>
      <AnimBar pct={content.bar} delay={delay} />
    </div>
  )
}