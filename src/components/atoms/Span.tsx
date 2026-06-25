import { SpanProps } from "../types";

export function Span({ txt, className, children }: SpanProps) {
    return (
        <span className={`text-dim font-sans text-lg text-balance leading-relaxed font-medium ${className}`}>
            {children}
            {txt}
        </span>
    )
}