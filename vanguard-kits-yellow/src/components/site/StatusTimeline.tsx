import { Check, Circle, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { OrderSummary } from "@/lib/types";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function StatusTimeline({ order }: { order: OrderSummary }) {
  const currentIndex = order.stages.findIndex((s) => s.key === order.currentStage);

  return (
    <ol className="relative">
      {order.stages.map((stage, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li key={stage.key} className="relative flex gap-4 pb-8 last:pb-0">
            {index < order.stages.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px",
                  isDone ? "bg-primary/60" : "bg-border",
                )}
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border",
                isDone && "border-primary bg-primary text-primary-foreground",
                isCurrent && "border-primary text-primary",
                !isDone && !isCurrent && "border-border text-muted-foreground",
              )}
            >
              {isDone ? (
                <Check className="h-4 w-4" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Circle className="h-2 w-2 fill-current" />
              )}
            </span>
            <div className="pt-0.5">
              <p
                className={cn(
                  "font-display text-lg uppercase leading-none tracking-wide",
                  !isDone && !isCurrent && "text-muted-foreground",
                )}
              >
                {stage.label}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{stage.description}</p>
              {formatDate(stage.completedAt) ? (
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-primary/80">
                  {formatDate(stage.completedAt)}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
