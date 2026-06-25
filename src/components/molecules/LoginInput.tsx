import { forwardRef } from "react";
import { FormInputProps } from "../types";
import { Span } from "../server-components";
import { AlertCircle } from "lucide-react";

export const LoginInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ type, placeholder, id, issues, ...rest }, ref) => {
        return (
            <div className='w-full flex flex-col gap-1.5'>
                <input
                    ref={ref}
                    className="w-full pl-8 pr-3.5 py-2.5 text-sm bg-card border border-border-mid rounded-md text-main placeholder:text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    aria-invalid={issues ? 'true' : 'false'}
                    aria-describedby={issues ? `${id}-error` : undefined}
                    {...rest}
                />
                {issues && (
                    <div id={`${id}-error`} className='flex items-center gap-1.5 text-xs text-red-500' role="alert">
                        <AlertCircle className="w-3.5 h-3.5 flexShrink-0" />
                        <Span txt={issues} />
                    </div>
                )}
            </div>
        );
    }
);

LoginInput.displayName = 'LoginInput';
