# scb-global-router

Tiny Cloudflare Worker that serves this site under the path
`siddiqui.mscarabia.com/scb-global` on an existing Cloudflare Pages
deployment.

## What it does

Rewrites `/scb-global/*` → the Cloudflare Pages deployment of this site, so
that `https://siddiqui.mscarabia.com/scb-global` (and any subpath such as
`/scb-global/#3`) works without a separate domain.

## Files

| File | Purpose |
|---|---|
| `worker.js` | The Worker script. |
| `wrangler.toml` | Worker configuration (name, compatibility date, route). |

## Setup

1. Go to the Cloudflare Dashboard → **Workers & Pages** → **Create** →
   **Worker** (or deploy via `wrangler`).
2. Give it a name, e.g. `siddiqui-scb-global-router`.
3. Copy `wrangler.toml` values (name, compatibility-date) into your Worker's
   config, or run `wrangler secret put PAGES_URL` and paste the Pages URL:
   `https://<your-pages-project>.pages.dev`
4. Deploy the Worker.

## Route on the zone

On the Cloudflare zone that owns `siddiqui.mscarabia.com`, add a
**Workers route** or a **custom domain** route:

```
siddiqui.mscarabia.com/scb-global/*  →  your Worker
```

Then `https://siddiqui.mscarabia.com/scb-global` resolves to the Pages
deployment, with the same query string / fragment behaviour as the Pages
URL (fragments are client-side only).

## Notes

- `wrangler.toml` uses `ASSETS = true` so the Worker serves the static
  assets from the Pages deployment automatically; set
  `PAGES_URL` as a secret if you prefer to point at a custom domain.
- This Worker is optional for Option A (subfolder) hosting; it is only
  needed if you keep this as a separate Pages project and want the path
  prefix.
