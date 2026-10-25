# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

Layout: **single-context**. Note that the glossary currently lives with its effort, at `wayfinder/questionario-festa/CONTEXT.md`, not at the repo root.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root, or, while none exists there, **`wayfinder/<effort>/CONTEXT.md`** for the effort you're working on (today: `wayfinder/questionario-festa/CONTEXT.md`)
- **`CONTEXT-MAP.md`** at the repo root if it exists: it points at one `CONTEXT.md` per context. Read each one relevant to the topic.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in.
- The effort's **`map.md`** (`## Notes` and `## Decisions so far`): until ADRs exist, the binding decisions are recorded there and in the closed tickets it links to.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

```
/
├── CLAUDE.md
├── docs/
│   ├── agents/
│   └── adr/                 ← created lazily
├── wayfinder/
│   └── questionario-festa/
│       ├── CONTEXT.md       ← glossary (Italian)
│       ├── map.md
│       ├── research/
│       └── tickets/
└── app/                     ← the SPA (Vite + React + TS), per ticket 10
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md` (e.g. Quiz, Polso, Rivelazione, Regia, Collegato). Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, or a decision in a map's `## Decisions so far`, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
