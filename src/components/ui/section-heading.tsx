import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
