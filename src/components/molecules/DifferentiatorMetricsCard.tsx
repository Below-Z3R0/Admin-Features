import { Title4, Span } from "../server-components";
import { DifferentiatorMetricProps } from "../types";

export function DifferentiatorMetricsCard({content}: DifferentiatorMetricProps) {
  return (
    <figure className="flex items-center justify-between gap-1.5 py-2 border-b border-border-subtle/50">
      
      <Title4 className="text-accent-light!" txt={content.value} />
      
      <figcaption>
        <Span 
          className="text-muted max-w-37.5 text-[14px]" 
          txt={content.description} 
        />
      </figcaption>

    </figure>
  )
}