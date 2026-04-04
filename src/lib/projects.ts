import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "Telemetry Platform",
    category: "Observability",
    description:
      "Real-time ingest and dashboard for transaction telemetry. Sub-millisecond event processing with live-updating Svelte visualizations over WebSocket streams.",
    stack: ["Rust", "Axum", "Svelte", "Docker Compose", "WebSockets"],
    outcome: "Full MVP with real-time dashboards, structured ingest API, and containerized deployment.",
    href: "https://github.com/ab2891/telemetry-platform",
    screenshot: "/screenshots/telemetry.png",
  },
  {
    name: "COA Display",
    category: "Minecraft Mod",
    description:
      "Fabric mod for Hypixel Skyblock that tracks Crown of Avarice coin progress with a configurable HUD, party chat commands, and PCA-based Diana burrow detection using arrow particle analysis.",
    stack: ["Java", "Fabric", "Mixin", "YACL3", "PCA / Linear Algebra"],
    outcome: "Arrow shaft detection via power iteration on covariance matrix, cubic polynomial burrow extrapolation.",
    href: "https://github.com/ab2891/coa-display",
    screenshot: "/screenshots/coa-display.png",
  },
  {
    name: "Poker Trainer",
    category: "Game AI",
    description:
      "Interactive poker training tool with hand analysis, equity calculations, and scenario replay. Designed to sharpen decision-making through deliberate practice.",
    stack: ["Rust", "Game Theory", "Statistics"],
    outcome: "Instant equity evaluation and hand-range visualization for study sessions.",
    href: "https://github.com/ab2891/poker-trainer",
    screenshot: "/screenshots/poker-trainer.png",
  },
  {
    name: "Skyblock MCP Server",
    category: "MCP / API",
    description:
      "Model Context Protocol server that gives AI assistants live access to Hypixel Skyblock data — bazaar prices, auction house, player profiles, networth estimates, mayor elections, and item search.",
    stack: ["TypeScript", "MCP SDK", "Hypixel API", "Zod"],
    outcome: "8 tools with smart caching, rate limiting, and real-time bazaar/auction data for AI-powered game analysis.",
    href: "https://github.com/ab2891/skyblock-mcp",
  },
  {
    name: "Lifebot",
    category: "Staff Operations Platform",
    description:
      "Aquatics-specific staff operations platform built for YMCA pool environments. Acts as an intelligent overlay on top of Sling scheduling — managing guards, certifications, shift templates, recurring cycles, policy enforcement, and plain-English operational querying through an OpenClaw-style orchestration layer.",
    stack: ["Rust", "Tauri", "Svelte", "SQLite", "Axum", "Policy Engine"],
    outcome: "Scheduling engine with certification validation, age/region policy filtering, explainable decision tracing, and a messaging abstraction layer for staff coordination.",
    href: "https://github.com/ab2891/lifebot",
    screenshot: "/screenshots/lifebot.png",
  },
  {
    name: "Parameter Golf",
    category: "ML Research",
    description:
      "OpenAI challenge entry to train the best language model that fits within 16MB and trains in under 10 minutes on 8×H100 GPUs. Optimizes compression efficiency (bits per byte) on FineWeb using transformer architectures with Muon optimizer, grouped query attention, and tied embeddings.",
    stack: ["Python", "PyTorch", "CUDA", "Distributed Training", "Muon Optimizer"],
    outcome: "Compact transformer with custom Newton-Schulz orthogonalization optimizer, quantization-aware training, and multi-GPU distributed training pipeline.",
    href: "https://github.com/ab2891/parameter-golf",
  },
];
