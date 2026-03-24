"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tabs = ["experience", "education", "projects"] as const;

type TabKey = (typeof tabs)[number];

export function CareerTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("experience");

  return (
    <section id="experience" className="pt-24">
      <Container className="space-y-10">
        <SectionHeading eyebrow="Career" />

        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                className={
                  isActive
                    ? "rounded-full border border-white/22 bg-white/12 px-4 py-2 text-sm font-medium capitalize text-white"
                    : "rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium capitalize text-white/70 transition hover:border-white/18 hover:text-white"
                }
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {activeTab === "experience" && (
            <div className="grid gap-6">
              {siteConfig.experience.map((item) => (
                <GlassPanel key={`${item.company}-${item.role}`} className="p-6 sm:p-8">
                  <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.28em] text-accent-cyan/80">
                        {item.period}
                      </p>
                      <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
                      <p className="text-base text-white/72">{item.company}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-base leading-7 text-foreground-muted">
                        {item.summary}
                      </p>
                      <ul className="space-y-3 text-sm leading-7 text-white/74">
                        {item.achievements.map((achievement) => (
                          <li key={achievement} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-cyan/80" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="grid gap-6 lg:grid-cols-2">
              {siteConfig.education.map((item) => (
                <GlassPanel key={`${item.school}-${item.program}`} className="h-full p-6 sm:p-8">
                  {item.period && (
                    <p className="text-sm uppercase tracking-[0.28em] text-accent-cyan/80">
                      {item.period}
                    </p>
                  )}
                  <h3 className={`${item.period ? "mt-3" : ""} text-2xl font-semibold text-white`}>{item.program}</h3>
                  <p className="mt-2 text-base text-white/72">{item.school}</p>
                  <p className="mt-4 text-sm leading-7 text-foreground-muted">
                    {item.summary}
                  </p>
                </GlassPanel>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <LiquidGlassPanel
                  key={project.name}
                  className="h-full"
                  contentClassName="flex h-full flex-col gap-6 p-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                      <span className="rounded-full border border-white/18 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-white/70">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-white/76"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto text-sm leading-7 text-white/68">{project.outcome}</p>
                </LiquidGlassPanel>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
