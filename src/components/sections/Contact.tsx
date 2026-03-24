"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="pt-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <LiquidGlassPanel contentClassName="px-6 py-10 sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <SectionHeading
                eyebrow="Contact"
                title="Want to get in touch?"
                description="Reach out for opportunities, collaboration, or just to say hi."
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-end">
                <Button href={`mailto:${siteConfig.social.email}`}>Email Me</Button>
                <Button href={siteConfig.social.github} variant="secondary">
                  GitHub
                </Button>
                <Button href={siteConfig.social.linkedin} variant="secondary">
                  LinkedIn
                </Button>
              </div>
            </div>
          </LiquidGlassPanel>
        </motion.div>
      </Container>
    </section>
  );
}
