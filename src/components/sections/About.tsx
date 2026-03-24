"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="pt-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="About"
          title="Building things that work, learning whatever it takes to get there."
          description=""
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GlassPanel className="space-y-6 p-6 sm:p-8">
            <p className="text-base leading-8 text-foreground-muted">
              {siteConfig.about}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/6 p-5"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-accent-violet/80">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </Container>
    </section>
  );
}
