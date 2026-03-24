import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-sheen relative overflow-hidden rounded-[28px] border border-white/12 bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.08]",
        className,
      )}
    >
      {children}
    </div>
  );
}
