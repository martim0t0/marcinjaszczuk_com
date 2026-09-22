# marcinjaszczuk.dev

Interactive resume and personal blog. Statically exported with Next.js, deployed
to GitHub Pages via GitHub Actions. Full spec: [`SPEC.MD`](./SPEC.MD).

Everything in `src/data/*.ts` and `content/blog/*.mdx` right now is placeholder
content — swap it out before launch.

## Stack

Next.js (App Router) · TypeScript · Bun · Tailwind CSS 4 · MDX · Decap CMS

## Local development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
bun run lint            # ESLint
bun run typecheck       # tsc --noEmit
bun run validate-content # frontmatter/slug validation for content/blog
bun test                # component + content tests
bun run build            # production static export (writes ./out)
```

CI (`.github/workflows/ci.yml`) runs all of the above on every PR and push to `main`.

## Content

- **Resume**: typed data in `src/data/{resume,experience,skills,education,projects,certifications}.ts`.
- **Blog**: MDX files in `content/blog/*.mdx` with frontmatter (`title`, `description`,
  `date`, `author`, `tags`, `published`). Validated at build time — invalid
  frontmatter, a bad date, or a duplicate slug fails the build (see
  `src/lib/content/schema.ts` / `src/lib/blog/posts.ts`).

### Publishing via Decap CMS

`/admin` (served from `public/admin/`) has a Blog collection wired up. The
GitHub backend authenticates through a self-hosted OAuth provider — a small
Cloudflare Worker in `workers/decap-oauth/`. See
[`workers/decap-oauth/README.md`](./workers/decap-oauth/README.md) for
one-time setup (GitHub OAuth App + deploying the worker); once `base_url` in
`public/admin/config.yml` points at it, `/admin` logs in with GitHub directly.

Editing/publishing through `/admin` commits straight to `content/blog/`,
which triggers CI and the GitHub Pages deploy automatically.

## Deployment

`.github/workflows/deploy.yml` builds and deploys `out/` to GitHub Pages on
every push to `main`. The site is served at the custom domain
**marcinjaszczuk.com** (both apex and `www` work — see below), configured via
`public/CNAME` and hardcoded as `NEXT_PUBLIC_SITE_URL` in the deploy workflow.

### Custom domain setup (one-time)

DNS is on Cloudflare. In the Cloudflare dashboard for `marcinjaszczuk.com`,
add these records, all set to **DNS only** (grey cloud, not proxied) — a
proxied (orange cloud) record can break GitHub's automatic TLS certificate
issuance for the custom domain:

| Type  | Name | Value                     |
| ----- | ---- | ------------------------- |
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |
| AAAA  | @    | 2606:50c0:8000::153         |
| AAAA  | @    | 2606:50c0:8001::153         |
| AAAA  | @    | 2606:50c0:8002::153         |
| AAAA  | @    | 2606:50c0:8003::153         |
| CNAME | www  | martim0t0.github.io        |

Then, in the GitHub repo → **Settings → Pages**, confirm the custom domain
field shows `marcinjaszczuk.com` (it should auto-populate from the committed
`public/CNAME` after the first successful deploy — set it manually there if
not) and wait for DNS to verify. Once verified, check **Enforce HTTPS**.
GitHub automatically redirects `www` → the apex domain (or vice versa,
whichever is set as the primary domain) once both resolve correctly, so both
forms work for visitors.

If you later want Cloudflare's proxy/CDN in front of the site, switch these
records to proxied *after* HTTPS is issued and working, and set Cloudflare's
SSL/TLS mode to **Full** (not Flexible — that causes a redirect loop with
GitHub Pages' own HTTPS redirect).
