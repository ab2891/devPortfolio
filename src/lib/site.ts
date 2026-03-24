import type { Education, Experience } from "@/types";

export const siteConfig = {
  name: "Agustin Blaumann",
  initials: "Agustin",
  url: "https://localhost:3000",
  description:
    "Developer portfolio — systems engineering, AI tooling, and full-stack product work.",
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] as { label: string; href: string }[],
  hero: {
    greeting: "Hi, I'm Agustin.",
    roles: [
      "Software Developer at Stax Labs",
      "CS & Economics at Rutgers Honors College",
    ],
    subheadline:
      "I build things across the stack — from Rust backends and AI agents to Minecraft mods and desktop apps.",
  },
  about:
    "I like working on projects where I get to learn something new. Most of what I build sits at the intersection of systems programming, AI tooling, and real-time data — but I'll pick up whatever the problem needs. When I'm not writing code for work or school, I'm usually building side projects or tutoring CS and math.",
  highlights: [
    {
      title: "Approach",
      description: "Pick the right tool for the problem, learn it fast, ship it clean.",
    },
    {
      title: "Focus",
      description: "Systems-level work, AI integrations, real-time data, and developer tooling.",
    },
  ] as { title: string; description: string }[],
  experience: [
    {
      company: "Stax Labs",
      role: "Software Developer",
      period: "Present",
      summary:
        "Full-stack development on a fintech platform focused on market intelligence, alternative data, and analytics tooling.",
      achievements: [
        "Building and maintaining product features across the Stax Labs platform.",
        "Working with real-time data pipelines and financial market integrations.",
        "Contributing to frontend and backend systems in a fast-moving startup environment.",
      ],
    },
    {
      company: "Private Tutoring",
      role: "CS & Math Tutor",
      period: "Ongoing",
      summary:
        "One-on-one tutoring for students in introductory computer science and mathematics courses.",
      achievements: [
        "Helping students build intuition for programming fundamentals, data structures, and algorithms.",
        "Covering math topics from calculus through discrete math and linear algebra.",
      ],
    },
  ] as Experience[],
  education: [
    {
      school: "Rutgers University — Honors College",
      program: "B.S. in Computer Science & Economics (In Progress)",
      period: "",
      summary:
        "Pursuing a dual-degree program combining software engineering fundamentals with quantitative economics and data analysis.",
    },
  ] as Education[],
  social: {
    github: "https://github.com/ab2891",
    linkedin: "https://linkedin.com/in/agustin-blaumann-0334b9350",
    email: "blaumannagustin@gmail.com",
  },
} as const;
