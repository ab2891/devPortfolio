import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "Brewers Pitch Analysis",
    category: "Sports Analytics",
    status: "Research prototype",
    description:
      "An interactive matchup explorer for Milwaukee’s pitching staff. Uses Statcast data to compare pitch choices for a given hitter, count, and base/out situation.",
    stack: ["Python", "XGBoost", "pandas", "JavaScript"],
    outcome:
      "Built a pitch-count audit and chronological evaluation workflow, with matchup plans for 13 pitchers against 14 hitters. Rankings are observational estimates, with support and uncertainty documented.",
  },
  {
    name: "BTC Trading Research Engine",
    category: "Market Data",
    status: "Paper-trading research",
    description:
      "A C++ engine for collecting prediction-market and BTC spot data, replaying events, and comparing trading ideas without risking real money.",
    stack: ["C++20", "SQLite", "WebSockets", "Docker"],
    outcome:
      "Runs six paper strategies with separate ledgers. Simulated fills account for latency and available liquidity; persisted state allows experiments to resume after a restart.",
    href: "https://github.com/ab2891/btc-trading-engine",
  },
  {
    name: "Telemetry Platform",
    category: "Observability",
    status: "Prototype",
    description:
      "An event-monitoring dashboard with Rust services for ingestion and live updates. Browse events by source, type, and severity while new events stream into the interface.",
    stack: ["Rust", "Axum", "Svelte", "PostgreSQL", "Redis"],
    outcome:
      "Separated durable event storage from live delivery: PostgreSQL stores events, Redis distributes updates, and a WebSocket service pushes them to the dashboard.",
    href: "https://github.com/ab2891/telemetry-platform",
    screenshot: "/screenshots/telemetry.png",
  },
  {
    name: "COA Display",
    category: "Minecraft Mod",
    status: "Client mod",
    description:
      "A Fabric mod for Hypixel SkyBlock that keeps Crown of Avarice progress visible through a configurable HUD and persistent crown completion tracking.",
    stack: ["Java", "Fabric", "Mixin", "YACL"],
    outcome:
      "Built a movable HUD with saved settings. Experimental Diana burrow prediction analyzes arrow particles with principal component analysis and polynomial extrapolation.",
    href: "https://github.com/ab2891/coa-display",
    screenshot: "/screenshots/coa-display.png",
  },
  {
    name: "Poker Trainer",
    category: "Game Theory",
    status: "Browser prototype",
    description:
      "A preflop poker practice app that generates training spots and gives feedback on your decisions using a Rust engine compiled to WebAssembly.",
    stack: ["Rust", "WebAssembly", "React", "TypeScript", "PWA"],
    outcome:
      "Moved the training engine into the browser with typed JavaScript bindings, chart-based action evaluation, and an installable PWA shell.",
    href: "https://github.com/ab2891/poker-trainer-pwa",
    screenshot: "/screenshots/poker-trainer.png",
  },
  {
    name: "Skyblock MCP Server",
    category: "AI Tooling",
    status: "Developer tool",
    description:
      "An MCP server that lets AI assistants query Hypixel SkyBlock data: player profiles, bazaar prices, auctions, elections, and item reference data.",
    stack: ["TypeScript", "MCP SDK", "Hypixel API", "Zod"],
    outcome:
      "Exposes eight tools with validated inputs, endpoint-specific cache lifetimes, and a shared rate limiter to reduce repeated API requests.",
    href: "https://github.com/ab2891/skyblock-mcp",
  },
  {
    name: "Obsidian KB",
    category: "Developer Tooling",
    status: "CLI + agent skill",
    description:
      "A knowledge-base workflow that turns source material into linked Obsidian notes. An agent skill handles ingestion and querying; a companion CLI handles routine maintenance.",
    stack: ["TypeScript", "Node.js", "Obsidian MCP", "chokidar"],
    outcome:
      "Built wikilink checks, frontmatter validation, schema-drift detection, and a watch mode, plus commands for creating topic folders, drafting indexes, and logging changes.",
    href: "https://github.com/ab2891/obsidian-kb-cli",
  },
  {
    name: "Lifebot",
    category: "Staff Operations",
    status: "Local demo",
    description:
      "A desktop operations assistant for aquatics coordinators. Manage guard certifications, recurring shifts, and scheduling requests, with an explanation for each assignment decision.",
    stack: ["Rust", "Tauri", "Svelte", "SQLite"],
    outcome:
      "Built policy checks for certifications, age, hours, and overlapping shifts. The seeded demo uses mock Sling and messaging providers to exercise scheduling workflows locally.",
    href: "https://github.com/ab2891/lifebot",
    screenshot: "/screenshots/lifebot.png",
  },
  {
    name: "Parameter Golf",
    category: "Machine Learning",
    status: "Experiment",
    description:
      "A language-model compression experiment for the Parameter Golf challenge, exploring how shared transformer blocks can provide greater effective depth within a small model artifact.",
    stack: ["Python", "PyTorch", "CUDA", "Quantization"],
    outcome:
      "Implemented shared transformer blocks with per-loop level signals, 6-bit quantization-aware training, and compressed model export to explore the trade-off between storage and compute.",
    href: "https://github.com/ab2891/parameter-golf/blob/main/records/track_10min_16mb/depth_recurrence_int6_qat/README.md",
  },
];
