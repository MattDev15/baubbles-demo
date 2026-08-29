import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-forest text-cream hover:bg-forest-dark shadow-sm",
  secondary: "bg-coral text-cream hover:bg-coral-dark shadow-sm",
  outline: "bg-transparent text-forest border border-forest hover:bg-forest hover:text-cream",
  ghost: "bg-transparent text-ink hover:bg-cream-soft",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm md:text-base",
  lg: "px-7 py-4 text-base md:text-lg",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button ref={ref} className={clsx(base, variantClasses[variant], sizeClasses[size], className)} {...props} />
  )
);
Button.displayName = "Button";

type LinkButtonProps = React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size; className?: string };

export function LinkButton({ className, variant = "primary", size = "md", ...props }: LinkButtonProps) {
  return <Link className={clsx(base, variantClasses[variant], sizeClasses[size], className)} {...props} />;
}
