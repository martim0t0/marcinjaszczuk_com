import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const typeStyles = {
  info: "border-accent-strong/40 bg-accent-strong/10",
  warning: "border-amber-500/40 bg-amber-500/10",
} as const;

export function Callout({
  type = "info",
  children,
}: {
  type?: keyof typeof typeStyles;
  children: ReactNode;
}) {
  return (
    <div
      role="note"
      className={cn(
        "my-4 rounded-lg border px-4 py-3 text-sm text-foreground",
        typeStyles[type],
      )}
    >
      {children}
    </div>
  );
}
