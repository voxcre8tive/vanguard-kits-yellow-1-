import { Link } from "@tanstack/react-router";
import mark from "@/assets/vanguard-mark.png";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="Vanguard Kits home">
      <img
        src={mark}
        alt=""
        width={512}
        height={512}
        className="h-8 w-8 shrink-0 object-contain transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.06em]">
        Vanguard<span className="text-primary"> Kits</span>
      </span>
    </Link>
  );
}
