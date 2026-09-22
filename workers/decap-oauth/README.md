# Decap CMS OAuth provider (Cloudflare Worker)

Decap's `github` backend needs something to run the OAuth handshake with
GitHub — GitHub won't hand out a token directly to a static site. This
Worker is that piece: `/auth` starts the GitHub login, `/callback` finishes
it and hands the token back to `/admin`.

## 1. Create a GitHub OAuth App

GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**.

- **Homepage URL**: `https://marcinjaszczuk.com`
- **Authorization callback URL**: the Worker's `/callback` URL — you won't
  know this for certain until step 2, but it'll be either
  `https://decap-oauth.<your-subdomain>.workers.dev/callback` or a custom
  route if you set one up. You can edit this value later once you know the
  real URL, so it's fine to guess/fill a placeholder now and come back.

Save it, then generate a **client secret**. Keep both the Client ID and
Client Secret handy — the secret is only shown once.

## 2. Deploy the Worker

**Option A — Cloudflare dashboard (no CLI needed):**

1. Cloudflare dashboard → Workers & Pages → Create → Create Worker.
2. Name it (e.g. `decap-oauth`), deploy the default template.
3. Open the worker → Edit code, paste in the contents of `worker.js`, Save and deploy.
4. Worker → Settings → Variables and Secrets → add two **secret** (not plain text) variables:
   `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, using the values from step 1.
5. Note the worker's URL, shown at the top (`https://decap-oauth.<subdomain>.workers.dev`).

**Option B — Wrangler CLI**, from this directory:

```bash
bunx wrangler login
bunx wrangler secret put GITHUB_CLIENT_ID
bunx wrangler secret put GITHUB_CLIENT_SECRET
bunx wrangler deploy
```

## 3. Wire everything together

1. Go back to the GitHub OAuth App from step 1 and set the real
   **Authorization callback URL** to `<worker-url>/callback`.
2. In `public/admin/config.yml`, set `base_url` to the worker's origin (no
   trailing slash, no path):
   ```yaml
   backend:
     name: github
     repo: martim0t0/marcinjaszczuk_com
     branch: main
     base_url: https://decap-oauth.<your-subdomain>.workers.dev
   ```
3. Commit and push that change (triggers a redeploy).
4. Visit `https://marcinjaszczuk.com/admin`, click "Login with GitHub", and
   authorize. You should land back in the CMS logged in.

## Notes

- The worker only ever handles the OAuth code exchange — it never sees your
  content or has any access beyond what GitHub's `repo` OAuth scope grants
  the resulting token (full read/write on repos you can access). Only people
  you want publishing content should be allowed to complete this flow —
  anyone who can authorize against your GitHub OAuth App and has push access
  to `marcinjaszczuk_com` can publish through `/admin`.
- If login silently does nothing, open the browser console — the most common
  cause is `base_url` not matching where the worker is actually deployed, or
  the OAuth App's callback URL not matching `<base_url>/callback` exactly.
