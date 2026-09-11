import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const vkButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-normal uppercase tracking-[0.14em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 rounded-xs",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:brightness-110 hover:-translate-y-0.5 active:brightness-95 active:translate-y-0 shadow-[0_14px_34px_-14px_var(--primary)]",
        outline:
          "border border-foreground/35 text-foreground hover:border-foreground hover:bg-foreground/10",
        solid:
          "bg-foreground text-background hover:bg-foreground/90",
        ghost: "text-foreground hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        md: "h-11 px-6 text-xs",
        lg: "h-14 px-8 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface VkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof vkButtonVariants> {
  asChild?: boolean;
}

export function VkButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: VkButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(vkButtonVariants({ variant, size }), className)} {...props} />;
}
