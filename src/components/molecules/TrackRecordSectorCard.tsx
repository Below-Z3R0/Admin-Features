import { Span } from "../server-components";
import { TrackRecordSectorCardProps } from "../types";

export function TrackRecordSectorCard({content, index}: TrackRecordSectorCardProps) {
  return (
    <div className="flex items-center gap-2.5 py-0.5">
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${index === 0 ? 'bg-accent-light' : 'bg-page/25'}`} />
      
      <Span className="" txt={content.title} />

    </div>
  )
}