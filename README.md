# SCB Global — Interview deck

**Mohammed Ahmed Siddiqui · Sales Manager, SCB Global**

A self-contained, single-file interview site (`index.html`) built for the
**SCB Global Ltd · Sales Manager, Saudi Arabia** interview. It keeps the same
design system, side rail, animations and keyboard navigation as the rest of
the siddiqui site, and runs entirely in the browser — no build step, no
storage, no external dependencies apart from Google Fonts.

## Contents

| Path | Purpose |
|---|---|
| `index.html` | The finished deck — 13 sections: intro, brief, career, record, network, why, company, fit, account, competitors, plan, questions, sources. |
| `src/template.html` | Source template (`cptit-interview-v2.html`) — kept so you can see where the design came from. |
| `src/prompt.md` | The original interview-generation prompt, kept for reference. |
| `scb-global-router/` | Tiny Cloudflare Worker that serves this site at `siddiqui.mscarabia.com/scb-global`. See [Hosting](#hosting). |

## Preview

Open `index.html` directly in a browser, or serve the folder:

```bash
npx --yes serve .
# or http-server / any static file server
```

## Editing copy

This is a static page — every edit happens inside `index.html`. Two things to
fill in before you share the link:

- `[Interviewer name]` — appears twice: in the top bar and in the hero kicker. Search for `class="ph"`.
- Personal figures — check against your CV before the interview (the deck
  says "my reading, not a commitment from anyone").

## Deploy — Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Repository: `defaltadmin/scb-global` · Production branch: `main`.
3. Framework preset: **None** · Build command: *(leave empty)* · Build output
   directory: `/` (root).
4. Add the custom domain `siddiqui.mscarabia.com` under the Pages project
   (DNS is already on Cloudflare, so add a CNAME/ANAME record and verify).
5. Save & Deploy. After the first build, the site is live at the domain root.

Then choose how to serve it at **`siddiqui.mscarabia.com/scb-global`**:

### Option A — subfolder (recommended, no Worker)

Keep this site inside the existing Pages project that already serves
`siddiqui.mscarabia.com` — the `siddiqui` repo. Its company pages live in
subfolders (`bio-key/`, `hikvision/`, `cpt-it/`), so add a `scb-global/`
folder there and push:

```bash
cp index.html scb-global/
# then push the siddiqui repo as usual
```

Cloudflare Pages keeps the folder structure, so the deck lands at
`siddiqui.mscarabia.com/scb-global/`. No Worker, no extra config.

### Option B — dedicated Pages project + Worker

1. Create a second Pages project from this repo (`defaltadmin/scb-global`),
   framework **None**, output `/`.
2. Add DNS for the project (e.g. `scb-global.siddiqui.mscarabia.com`), or use
   the project URL.
3. Deploy the Worker in `scb-global-router/` on the zone that owns
   `siddiqui.mscarabia.com`; it rewrites `/scb-global/*` to the Pages URL.

See `scb-global-router/README.md` for the Worker setup.

## Files in this repo (why they exist)

- `index.html` — the finished, interview-ready deck.
- `src/template.html`, `src/prompt.md` — source inputs, kept for reference
  only (`src/` is never served to the browser).
- `scb-global-router/` — Worker + `wrangler.toml` for Option B.
