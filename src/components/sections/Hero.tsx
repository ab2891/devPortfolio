"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32">
      <Container className="relative z-10">
        <LiquidGlassPanel className="overflow-hidden" contentClassName="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="space-y-8 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-semibold tracking-tight text-white sm:text-6xl"
            >
              {siteConfig.hero.greeting}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                {siteConfig.hero.roles.map((role) => (
                  <span
                    key={role}
                    className="text-sm font-medium uppercase tracking-[0.2em] text-accent-cyan/80"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <p className="max-w-2xl text-base leading-8 text-foreground-muted sm:text-lg">
                {siteConfig.hero.subheadline}
              </p>
            </motion.div>
          </div>
        </LiquidGlassPanel>
      </Container>
    </section>
  );
}
