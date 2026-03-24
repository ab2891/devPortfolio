import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type LiquidGlassPanelProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function LiquidGlassPanel({
  children,
  className,
  contentClassName,
}: LiquidGlassPanelProps) {
  return (
    <div className={cn("liquid-glass rounded-[30px]", className)}>
      <div className={cn("liquid-glass-content rounded-[inherit]", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
