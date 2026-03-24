"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-30 px-4 pt-4"
    >
      <Container className="max-w-6xl">
        <LiquidGlassPanel className="rounded-full" contentClassName="px-5 py-4 sm:px-6">
          <nav className="flex flex-wrap items-center justify-between gap-4">
            <a
              href="/"
              className="text-sm font-semibold tracking-[0.22em] text-white/90 uppercase"
            >
              {siteConfig.initials}
            </a>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/68">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  className="rounded-full px-2 py-1 transition hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </LiquidGlassPanel>
      </Container>
    </motion.header>
  );
}
