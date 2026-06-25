import { IpmStateCardProps } from "../types";

export function IpmStateCard({content}: IpmStateCardProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 bg-card hover:bg-hover transition-colors duration-300 rounded-lg">
      
      <span className="text-accent-light min-w-12">
        {content.score}
      </span>

      <span className="font-medium min-w-22.5">
        {content.state}
      </span>

      <span className="text-muted">
        {content.recomendations}
      </span>

    </div>
  )
}