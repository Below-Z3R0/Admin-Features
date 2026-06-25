import type { HeroTagProps } from "../types";

export function HeroTag({content}: HeroTagProps) {
    return (
        <span className="text-[10px] tracking-widest uppercase opacity-25 font-outfit">
            {content}
        </span>
    )
}