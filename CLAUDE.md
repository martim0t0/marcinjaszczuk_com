# CLAUDE.md

We're building the app described in @SPEC.MD. Read that file for general architectural tasks or to double-check the exact database structure, tech stack, or application architecture.

Source lives under `src/` (App Router at `src/app/`), content under `content/blog/`, and the Decap CMS scaffold under `public/admin/` (must live under `public/` for static export to serve it at `/admin`, unlike the spec's suggested top-level `admin/`).

Keep your replies extremely concise and focus on conveying the key information. No unncecessary fluff, no long code snippets.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project status

The full application described in SPEC.MD has been built out: interactive
accordion resume with typed placeholder data, MDX blog with build-time
content validation, light/dark theme system, Decap CMS scaffold (auth not
wired up — see README), GitHub Actions CI + Pages deploy, and component
tests. Resume/blog content in `src/data/*.ts` and `content/blog/*.mdx` is
placeholder — swap it for real content whenever.

Notable deviations from SPEC.MD's suggested structure, driven by actual
Next.js/GitHub Pages constraints:
- Decap CMS files live at `public/admin/`, not a top-level `admin/` —
  static export only serves `/admin` from inside `public/`.
- Blog MDX is compiled via `next-mdx-remote/rsc` rather than `@next/mdx`,
  to avoid relying on Turbopack's dynamic-import support for `.mdx` files.
- `sitemap.ts`/`robots.ts` need `export const dynamic = "force-static"` in
  Next 16 under `output: "export"`, or the build fails.

Key points to keep in mind when touching this code:

- **Static export only.** No server runtime, API routes, server actions requiring a server, or database — everything must be resolvable at build time (SPEC §15, §29).
- **Server Components by default**; reach for a Client Component only for genuine interactivity (accordion state, theme toggle, mobile nav) (SPEC §30).
- **Content is data, not markup.** Resume content lives in typed data modules (`src/data/*.ts`) / MDX under `content/blog/`, not hardcoded into components (SPEC §4, §10-11).
- Accessibility and `prefers-reduced-motion` are first-class requirements for any animation work (accordions especially), not an afterthought (SPEC §22-23, §42).
- Next.js 16's `params`/`searchParams` are Promise-only now — `await` them, use the generated `PageProps<'/route'>`/`LayoutProps<'/route'>` types.

## Commands

```bash
bun install
bun dev               # dev server
bun run build         # production static export -> ./out
bun run lint          # ESLint
bun run typecheck     # tsc --noEmit
bun run validate-content # frontmatter/slug validation for content/blog
bun test              # component + content tests (bun:test + RTL + happy-dom)
```

See `README.md` for the full local dev / publishing workflow.
