# Issue tracker: Local Markdown (wayfinder layout)

Issues and specs for this repo live as markdown files under `wayfinder/`. There is no git remote and no hosted tracker.

## Conventions

- One effort per directory: `wayfinder/<effort-slug>/` (e.g. `wayfinder/questionario-festa/`)
- The effort's map/spec is `wayfinder/<effort-slug>/map.md`
- Tickets are one file per ticket at `wayfinder/<effort-slug>/tickets/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Research output that backs a ticket goes to `wayfinder/<effort-slug>/research/<NN>-<slug>.md`, with the same number and slug as its ticket, and is linked from the ticket's `## Research` section
- Each ticket starts with YAML frontmatter:

  ```yaml
  ---
  title: <title>
  labels: [wayfinder:<type>]   # plus any triage label, see triage-labels.md
  status: open                 # open | closed
  assignee:                    # empty, or Luca
  blocked_by: []               # list of ticket slugs, e.g. [03-set-domande]
  ---
  ```

- Body sections: `## Question` (always), then `## Research` / `## Prototype` when relevant, and `## Resolution` once closed
- Triage state is recorded by adding the role label to `labels:` (see `triage-labels.md`)
- Comments and conversation history append to the bottom of the file under a `## Comments` heading
- Content is written in Italian, using the vocabulary of the effort's `CONTEXT.md`

## When a skill says "publish to the issue tracker"

Create a new file at `wayfinder/<effort-slug>/tickets/<NN>-<slug>.md`, using the next free number, and create the directory if needed.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path, the slug or the ticket number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `wayfinder/<effort>/map.md`, with frontmatter `labels: [wayfinder:map]`, and `## Destination`, `## Notes` and `## Decisions so far` in the body.
- **Child ticket**: `wayfinder/<effort>/tickets/NN-<slug>.md` with the question in `## Question`. The type is the label `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling` or `wayfinder:task`.
- **Blocking**: the `blocked_by:` frontmatter list. A ticket is unblocked when every ticket it lists has `status: closed`.
- **Frontier**: scan `wayfinder/<effort>/tickets/` for tickets with `status: open`, unblocked and with an empty `assignee:`. The lowest number wins.
- **Claim**: set `assignee:` (e.g. `Luca`, or the agent) and save before any work.
- **Resolve**: write the answer under a `## Resolution` heading and set `status: closed`. Then append a one-line context pointer (`[title](tickets/NN-slug.md): gist`) to `## Decisions so far` in `map.md`.
