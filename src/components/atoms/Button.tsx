import type { ButtonProps } from "../types";
import { Span } from "./Span";

export function Button({ txt, img, children, svg: Svg, alt, fillcolor, className, txtcolor, type = 'button', onClick }: ButtonProps) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {txt && <Span txt={txt} className={`${txtcolor}`} />}
      {Svg && <Svg className={`size-full ${fillcolor}`} />}
      {img && <img src={img} alt={alt || "icon"} className="size-full" />}
      {children}
    </button>
  );
}