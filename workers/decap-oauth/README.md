# Decap CMS OAuth provider (Cloudflare Worker)

Decap's `github` backend needs something to run the OAuth handshake with
GitHub — GitHub won't hand out a token directly to a static site. This
Worker is that piece: `/auth` starts the GitHub login, `/callback` finishes
it and hands the token back to `/admin`.

Live setup: this worker (`decap-oauth`) is connected to this GitHub repo via
Cloudflare Workers Builds, so pushes to `main` that touch this directory
auto-deploy. Below is what it took to get there — useful if this ever needs
to be redone (new Cloudflare account, secret rotation, etc.).

## 1. Create a GitHub OAuth App

GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
(the form may say **Redirect URI** instead of "Authorization callback URL"
— same field).

- **Homepage URL**: `https://marcinjaszczuk.com`
- **Redirect URI**: `https://decap-oauth.<your-subdomain>.workers.dev/callback`
  — must match **exactly** (scheme, host, path) or GitHub shows "the
  redirect_uri is not associated with this application."

Save, then generate a **client secret** — it's only shown once.

## 2. Deploy the Worker

Cloudflare dashboard → Workers & Pages → Create → Create Worker → name it
`decap-oauth` → connect it to this GitHub repo (or paste `worker.js`
manually if not using Git integration).

If connecting to Git, in the worker's **Settings → Build configuration**:
- **Root directory**: `workers/decap-oauth` (this repo is a monorepo —
  without this, the build tries to `bun install` the whole Next.js app's
  root lockfile and fails).
- **Build command**: leave blank — there's nothing to build, it's a plain
  Worker script.

After the first deploy, confirm under **Settings → Domains & Routes** that
the `workers.dev` route is enabled (it returns Cloudflare error 1042 if not).

## 3. Set the secrets — use Wrangler, not the dashboard UI

**This is the step that actually matters.** Secrets added through the
dashboard's "Variables and Secrets" UI did not reliably attach to this
worker once it was Git-connected — `/debug`-style checks showed `env` with
zero keys even with values visibly saved in *both* the Production and
Preview sections of that UI. What worked: setting them directly via
Wrangler, which binds unambiguously to the named worker:

```bash
cd workers/decap-oauth
bunx wrangler login
bunx wrangler secret put GITHUB_CLIENT_ID
bunx wrangler secret put GITHUB_CLIENT_SECRET
```

Paste the Client ID / Client Secret from step 1 when prompted. Takes effect
immediately, no redeploy needed.

## 4. Wire everything together

1. `public/admin/config.yml`'s `backend.base_url` should already point at
   `https://decap-oauth.martim0t0.workers.dev` — update it if the worker
   ever moves.
2. Visit `https://marcinjaszczuk.com/admin`, click "Login with GitHub", and
   authorize. You should land back in the CMS logged in.

## Notes

- The worker only ever handles the OAuth code exchange — it never sees your
  content or has any access beyond what GitHub's `repo` OAuth scope grants
  the resulting token (full read/write on repos you can access). Only people
  you want publishing content should be allowed to complete this flow —
  anyone who can authorize against the GitHub OAuth App and has push access
  to `marcinjaszczuk_com` can publish through `/admin`.
- Troubleshooting checklist, in the order these actually came up:
  1. **Cloudflare error 1042** on the worker's own URL → `workers.dev` route
     disabled (Settings → Domains & Routes).
  2. **Build fails on `bun install`** → Root directory not set to
     `workers/decap-oauth`, so it's installing the monorepo root's lockfile.
  3. **Build fails on `bun run build`** → clear the Build command field.
  4. **GitHub shows a 404 with `client_id=undefined`** → secrets aren't
     bound; use `wrangler secret put` (step 3 above), not the dashboard UI.
  5. **"redirect_uri is not associated with this application"** → the OAuth
     App's Redirect URI doesn't exactly match `<base_url>/callback`.
