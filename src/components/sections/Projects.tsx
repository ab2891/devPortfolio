"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="pt-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Featured Work"
          title="Selected projects that turn ambitious ideas into resilient products."
          description="From real-time fintech observability to Minecraft mod engineering — each project reflects a different dimension of the craft."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
            >
              <GlassPanel className="flex h-full flex-col overflow-hidden p-0">
                {/* Screenshot area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.03]">
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} screenshot`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/20">
                      Screenshot coming soon
                    </div>
                  )}
                  {/* Category badge overlaying the screenshot */}
                  <span className="absolute top-3 right-3 rounded-full border border-white/12 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent-cyan/80 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Description area */}
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {project.description}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-white/40">
                    {project.outcome}
                  </p>

                  {/* Tech stack tags */}
                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/8 pt-4">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* View Project link */}
                  {project.href && project.href !== "#" && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-accent-cyan"
                    >
                      View Project
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  )}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
