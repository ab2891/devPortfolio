# Portfolio direction: technical, with a personal signature

The current homepage remains at `/`. The working concept is at `/design`; it is excluded from search indexing. This is a local design study, not a deployment.

## What the content pass changed

All nine descriptions now start with a concrete purpose and follow with implementation evidence. Project stage is visible in the existing Projects tab. Recent projects stay first.

- Telemetry: replaced the unmeasured sub-millisecond claim with the actual PostgreSQL → Redis → WebSocket architecture. Evidence: `../telemetry-platform/services/{ingest,realtime}/src/main.rs`.
- COA Display: distinguishes the configurable HUD from experimental particle-based burrow predictions. Evidence: `../coa-display/README.md`.
- Poker Trainer: describes the Rust/WebAssembly preflop trainer and links to the PWA repository. Evidence: `../poker-trainer-pwa/README.md` and `engine/src/wasm.rs`.
- Skyblock MCP: retained the eight-tool count verified in `../skyblock-mcp/src/tools.ts`; described concrete caching and rate limiting instead of “smart” caching.
- Obsidian KB: separated agent ingestion/querying from CLI maintenance and removed the broad comparison with hosted RAG products. Evidence: the skill and CLI READMEs.
- Lifebot: makes the seeded local demo and mock integration boundaries clear. Evidence: `../lifeBot/README.md`.
- Parameter Golf: describes Agustin’s depth-recurrence experiment rather than the upstream challenge’s general architecture. Results in the experiment README and submission metadata remain TBD; do not present a validated score or time. Evidence: commits `b0e9b19`, `6de3333` and `../parameter-golf/records/track_10min_16mb/depth_recurrence_int6_qat/README.md`.
- Brewers and BTC: retained the research framing and grounded scope from their READMEs. Brewers still has no verified public source URL.

## Design diagnosis

The current homepage puts the projects behind a career tab. Similar glass panels flatten the hierarchy, long descriptions slow scanning, and the animated background has little relationship to the projects. The concept makes the work visible in the normal scroll and varies the scale of presentation.

## Proposed direction

Charcoal and moss, strong sans-serif headings, small monospaced annotations, and a serif accent for a little personality. A small ASCII ripple field gives the opening a recognizable detail. It respects reduced motion, has a pause control, stops updating in background tabs, and needs no WebGL. The field is decorative, not market or pitch data.

Three project spotlights lead with Brewers, BTC, and Obsidian KB. The first two show current technical depth; Obsidian adds a tool people can use. Small system/workflow diagrams explain each project without invented performance charts. Other projects remain in a compact index with existing screenshots where available.

The concept shares the real project data with the current site. Keep links useful, content readable without animation, keyboard focus visible, and layouts responsive. Before promoting it to the homepage, integrate the work experience and education content, capture current screenshots for the two newest projects, and resolve the public site URL (currently configured as localhost). Source links are available where a repository is known; Brewers has no dead CTA.

## References

- https://brittanychiang.com/ — clear identity, experience, and concise project summaries.
- https://paco.me/ — short, specific project descriptions and a personal introduction.
- https://www.joshwcomeau.com/ — personality expressed through the subject matter and interactive explanations.

These are references for clarity and personality. The concept uses Agustin’s projects and a distinct visual direction.

## Review and verification

Run `npm run dev` from this checkout and open `http://localhost:3000/design`. The original homepage remains at `/`.

- `npm run build` passed, including TypeScript and static generation for both routes.
- Playwright checked 320, 390, 768, and 1440 pixel widths without horizontal overflow.
- ASCII updates, pause control, and the reduced-motion static state passed browser checks.
- Every local navigation anchor resolves; all nine projects render in the existing homepage’s Projects tab without empty source links.
- No browser page errors were recorded.
- Desktop and mobile screenshots are saved in `docs/previews/` and were visually reviewed.
