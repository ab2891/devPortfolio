"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-30 px-4 pt-4"
    >
      <Container className="max-w-6xl">
        <LiquidGlassPanel className="rounded-full" contentClassName="px-5 py-4 sm:px-6">
          <nav className="flex items-center justify-between">
            <a
              href="/"
              className="text-sm font-semibold tracking-[0.22em] text-white/90 uppercase"
            >
              {siteConfig.initials}
            </a>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-3 text-sm text-white/68">
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden flex flex-col items-center justify-center gap-[5px] p-1"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-5 bg-white/80 rounded-full origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[2px] w-5 bg-white/80 rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-5 bg-white/80 rounded-full origin-center"
              />
            </button>
          </nav>
        </LiquidGlassPanel>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 sm:hidden"
            >
              <LiquidGlassPanel className="rounded-2xl" contentClassName="px-5 py-4">
                <div className="flex flex-col gap-3 text-sm text-white/68">
                  {siteConfig.nav.map((item) => (
                    <a
                      key={item.href}
                      className="rounded-lg px-2 py-1.5 transition hover:text-white"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </LiquidGlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}
