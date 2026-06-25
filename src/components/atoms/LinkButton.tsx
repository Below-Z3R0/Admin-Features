import type { LinkButtonProps } from "../types";
import { Span } from "./Span";


export function LinkButton({ link, txt, children, svg: Svg, img, alt, fillcolor, txtcolor, className }: LinkButtonProps) {
  return (
    <a href={link} className={className} target={link?.startsWith('#') ? undefined : "_blank"} rel={link?.startsWith('#') ? undefined : "noopener noreferrer"}>
      {txt && <Span txt={txt} className={`${txtcolor}`} />}
      {Svg && <Svg className={` size-full ${fillcolor}`} />}
      {img && <img src={img} alt={alt || "icon"} className="size-full" />}
      {children}
    </a>
  );
}