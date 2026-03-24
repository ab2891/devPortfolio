"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "border-accent-cyan/40 bg-gradient-to-r from-accent-cyan to-accent-violet text-slate-950 shadow-lg shadow-accent-cyan/20 hover:scale-[1.02]",
        secondary:
          "border-white/12 bg-white/6 text-white hover:border-white/20 hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  className?: string;
  href: string;
};

export function Button({ children, className, href, variant }: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <Link
      className={cn(buttonVariants({ variant }), className)}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
