# Interactive Resume & Personal Blog

## Technical Specification

**Document Version:** 1.0
**Status:** Foundation / Implementation Specification
**Primary Application Type:** Static personal resume, portfolio, and blog
**Deployment Platform:** GitHub Pages
**CMS:** Decap CMS
**Content Format:** MDX
**Framework:** Next.js
**Language:** TypeScript
**Package Manager / Runtime:** Bun
**Styling:** Tailwind CSS

---

# 1. Project Overview

The application will be a modern, responsive personal website combining an interactive professional resume with a lightweight personal blog.

The primary experience will present the user's professional background in a visually engaging resume format. Major resume sections will behave as interactive accordions, allowing visitors to progressively reveal additional information without overwhelming the initial page.

The secondary experience will be a blog containing periodically published articles. Blog content will be authored through Decap CMS and stored as MDX files within the GitHub repository. Publishing or updating content will trigger the existing GitHub Actions build pipeline, which will generate a new static version of the website and deploy it to GitHub Pages.

The application will intentionally avoid server-side runtime dependencies wherever possible.

## 1.1 Primary Goals

1. Create a polished professional online resume.
2. Make the resume interactive without sacrificing usability or accessibility.
3. Provide a lightweight blog publishing system.
4. Keep the entire project GitHub-centric.
5. Avoid unnecessary databases, backend servers, and infrastructure.
6. Maintain excellent mobile and desktop experiences.
7. Support light and dark visual themes.
8. Establish a clean separation between content, presentation, and application behavior.
9. Make the site extensible without requiring architectural changes later.
10. Maintain good SEO, accessibility, and performance.

## 1.2 Non-Goals

The initial implementation will not include:

* User accounts for the public website.
* Comments.
* User-generated content.
* Search functionality.
* A traditional database.
* Server-side API endpoints.
* Real-time content updates.
* E-commerce functionality.
* Complex analytics infrastructure.
* A social-media-style feed.
* A full-featured publishing platform.

These features may be considered later if requirements change.

---

# 2. Technology Stack

| Area                     | Technology                                                     |
| ------------------------ | -------------------------------------------------------------- |
| Framework                | Next.js                                                        |
| Application architecture | Next.js App Router                                             |
| Language                 | TypeScript                                                     |
| Runtime/package manager  | Bun                                                            |
| Styling                  | Tailwind CSS                                                   |
| Content                  | MDX                                                            |
| CMS                      | Decap CMS                                                      |
| CMS backend              | GitHub                                                         |
| Source control           | Git/GitHub                                                     |
| CI/CD                    | GitHub Actions                                                 |
| Hosting                  | GitHub Pages                                                   |
| Animation                | CSS transitions/keyframes and/or lightweight animation library |
| Testing                  | TypeScript, ESLint, component/accessibility testing            |
| Primary deployment model | Static export                                                  |

The application should favor native Next.js, React, CSS, and Tailwind capabilities before introducing third-party libraries.

---

# 3. High-Level Architecture

The application will use a static-site architecture.

```text
                    ┌────────────────────┐
                    │     Decap CMS      │
                    │    /admin route    │
                    └─────────┬──────────┘
                              │
                              │ commits MDX/content
                              ▼
                    ┌────────────────────┐
                    │   GitHub Repository│
                    │                    │
                    │ /content           │
                    │ /public            │
                    │ /src               │
                    └─────────┬──────────┘
                              │
                              │ push
                              ▼
                    ┌────────────────────┐
                    │   GitHub Actions   │
                    │                    │
                    │ lint               │
                    │ typecheck          │
                    │ test               │
                    │ build              │
                    └─────────┬──────────┘
                              │
                              │ static artifact
                              ▼
                    ┌────────────────────┐
                    │   GitHub Pages     │
                    │                    │
                    │ static HTML/CSS/JS │
                    │ assets             │
                    └─────────┬──────────┘
                              │
                              ▼
                         Visitor Browser
```

This architecture eliminates the need for a continuously running application server.

GitHub Pages supports custom GitHub Actions workflows for building and deploying static websites.

---

# 4. Content Architecture

Content must be separated from UI implementation.

The application should not contain large amounts of resume prose directly inside React components.

Instead:

```text
Content
   ↓
Typed data / MDX
   ↓
React components
   ↓
Presentation
```

This allows content to change without requiring component rewrites.

---

# 5. Site Information Architecture

The initial site structure will be:

```text
/
├── Resume
│   ├── Hero
│   ├── Summary
│   ├── Skills
│   ├── Experience
│   ├── Education
│   ├── Projects
│   └── Certifications
│
├── Blog
│   ├── Blog Index
│   └── Blog Post
│
└── Contact
```

There will not be a dedicated Aviation section.

The resume itself may remain primarily a single-page experience, while blog posts use individual routes.

---

# 6. Resume Experience

## 6.1 Resume Sections

The following major sections should be implemented as expandable interactive sections:

1. Summary
2. Skills
3. Experience
4. Education
5. Projects
6. Certifications

Contact information may be displayed as a persistent or visually distinct section rather than necessarily using the accordion pattern.

## 6.2 Accordion Behavior

Each major section will have:

* A visible heading.
* A short summary or preview.
* A visual expansion indicator.
* A clickable/tappable interaction area.
* Expanded content.
* Keyboard accessibility.
* Screen-reader state information.

Multiple sections may be open simultaneously.

Opening one section must **not** automatically close another.

Example:

```text
┌─────────────────────────────────────────────┐
│ EXPERIENCE                              ▼   │
├─────────────────────────────────────────────┤
│ Senior Business Systems Analyst             │
│ Organization                               │
│ 2024–Present                                │
│                                             │
│ Overview                                    │
│ ...                                         │
│                                             │
│ Responsibilities                            │
│ • ...                                       │
│ • ...                                       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SKILLS                                  ▲   │
├─────────────────────────────────────────────┤
│ TypeScript    Next.js    SQL    ...         │
└─────────────────────────────────────────────┘
```

---

# 7. Accordion Animation Requirements

The visual style should use smooth, slightly bouncy motion.

The animation should feel polished and intentional rather than cartoonish.

## 7.1 Expansion

When opening:

1. Container begins collapsed.
2. Height transitions smoothly toward its natural content height.
3. Content fades/slides into view.
4. Content may have a subtle upward/downward pop-in.
5. Expansion indicator rotates.
6. Final state settles with a subtle spring-like effect.

## 7.2 Collapse

When closing:

1. Content begins fading.
2. Content moves slightly toward its collapsed position.
3. Container contracts.
4. Expansion indicator rotates back.
5. Container settles cleanly.

## 7.3 Animation Principles

Animations should:

* Be fast enough to avoid slowing navigation.
* Feel smooth and spring-like.
* Avoid excessive motion.
* Remain usable on mobile.
* Respect `prefers-reduced-motion`.

When reduced motion is requested by the operating system, animations should be disabled or reduced to short opacity/state transitions.

---

# 8. Component Architecture

The application should use reusable components.

Suggested structure:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── ...
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── resume/
│   ├── blog/
│   ├── ui/
│   ├── theme/
│   └── mdx/
│
├── content/
│   └── blog/
│
├── data/
│   ├── resume.ts
│   ├── experience.ts
│   ├── skills.ts
│   ├── education.ts
│   ├── projects.ts
│   └── certifications.ts
│
├── lib/
│   ├── blog/
│   ├── content/
│   └── utils/
│
├── types/
│   ├── resume.ts
│   └── blog.ts
│
└── styles/
```

The exact organization may be adjusted during implementation, but the separation of concerns should remain.

---

# 9. Core Components

## 9.1 `ResumeAccordion`

Responsible for:

* Section title.
* Preview information.
* Expanded/collapsed state.
* Animation.
* Accessibility state.
* Keyboard interaction.

Example API:

```ts
interface ResumeAccordionProps {
  id: string;
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}
```

## 9.2 `ExperienceCard`

Represents an individual employment experience.

```ts
interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  accomplishments?: string[];
  technologies?: string[];
}
```

## 9.3 `SkillGroup`

```ts
interface SkillGroup {
  id: string;
  name: string;
  skills: string[];
}
```

## 9.4 `ProjectCard`

```ts
interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  repository?: string;
}
```

## 9.5 `BlogPostCard`

Displays:

* Title
* Publication date
* Description/excerpt
* Categories/tags
* Optional featured image
* Link to article

---

# 10. Resume Data Model

Resume content should be strongly typed.

Example:

```ts
export interface Resume {
  summary: string;
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}
```

Education:

```ts
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}
```

Certification:

```ts
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expirationDate?: string;
  credentialUrl?: string;
}
```

The data model should be extensible without requiring the UI to be rewritten.

---

# 11. Blog Architecture

The blog will use MDX files stored in the GitHub repository.

Example:

```text
content/
└── blog/
    ├── first-post.mdx
    ├── learning-typescript.mdx
    └── building-this-site.mdx
```

Each post will have frontmatter.

Example:

```mdx
---
title: "Building My Interactive Resume"
description: "Why I decided to build my resume as an interactive website."
date: "2026-09-09"
author: "Marcin"
tags:
  - Next.js
  - TypeScript
  - Web Development
published: true
---

# Building My Interactive Resume

Post content goes here.
```

The application will use the frontmatter to generate metadata and blog indexes.

Next.js supports MDX through `@next/mdx`, including custom MDX components and dynamically generated routes.

---

# 12. MDX Component System

MDX should support custom components.

For example:

```mdx
<Callout type="info">
This is an informational callout.
</Callout>
```

Potential future components:

* `Callout`
* `CodeBlock`
* `Figure`
* `Image`
* `Quote`
* `Timeline`
* `InteractiveDemo`

These should be implemented only when needed.

The initial implementation should avoid building an unnecessary component library.

---

# 13. Decap CMS

Decap CMS will provide the content-authoring interface.

The CMS will be exposed at:

```text
/admin
```

Decap CMS is designed to manage files in a Git repository rather than act as a content-serving backend.

## 13.1 CMS Backend

The initial backend will be GitHub.

Conceptually:

```yaml
backend:
  name: github
  repo: OWNER/REPOSITORY
  branch: main
```

The actual repository name will be supplied during implementation.

The GitHub backend requires appropriate repository access for users publishing content.

## 13.2 CMS Collections

The initial CMS should expose a Blog collection.

Example:

```yaml
collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    create: true
    slug: "{{slug}}"
    fields:
      - label: Title
        name: title
        widget: string

      - label: Description
        name: description
        widget: text

      - label: Publication Date
        name: date
        widget: datetime

      - label: Tags
        name: tags
        widget: list

      - label: Published
        name: published
        widget: boolean
        default: true

      - label: Body
        name: body
        widget: markdown
```

Because MDX is the intended application format, the CMS configuration and build pipeline should be validated against the exact editor behavior during implementation.

If Decap's standard Markdown widget does not provide sufficient MDX authoring capabilities, the implementation should preserve the underlying `.mdx` file format while adding only the minimum required CMS customization.

---

# 14. CMS Publishing Workflow

The intended workflow is:

```text
1. Open /admin
        ↓
2. Authenticate
        ↓
3. Create/edit blog post
        ↓
4. Save/publish
        ↓
5. Decap commits content to GitHub
        ↓
6. GitHub Actions detects change
        ↓
7. Application builds
        ↓
8. Static site is generated
        ↓
9. GitHub Pages deployment occurs
        ↓
10. Updated article becomes public
```

This creates a simple Git-based publishing model with the repository serving as the canonical content source.

---

# 15. GitHub Pages Deployment

The application must be configured for static export.

The production build must not depend on:

* Next.js server runtime.
* Server Actions requiring a server.
* API routes requiring runtime execution.
* Dynamic server-side rendering at request time.
* Server-side authentication.
* Database connectivity.

All content must be available at build time.

GitHub Pages publishes static files and supports GitHub Actions workflows for custom static-site builds.

---

# 16. GitHub Actions

The project should contain workflows under:

```text
.github/
└── workflows/
    ├── ci.yml
    └── deploy.yml
```

## 16.1 CI

CI should run on pull requests and relevant pushes.

Expected stages:

```text
Checkout
   ↓
Install dependencies
   ↓
Lint
   ↓
Type check
   ↓
Tests
   ↓
Production build
```

## 16.2 Deployment

Deployment should run when changes are merged/pushed to the production branch.

Conceptually:

```text
Checkout
   ↓
Install Bun
   ↓
Install dependencies
   ↓
Run validation
   ↓
Build static site
   ↓
Upload Pages artifact
   ↓
Deploy to GitHub Pages
```

GitHub's current Pages deployment model uses `configure-pages`, `upload-pages-artifact`, and `deploy-pages` actions for custom workflows.

---

# 17. Branching Strategy

Recommended initial strategy:

```text
main
 │
 ├── production
 │
 └── feature/*
```

For a personal project, the simplest implementation may use:

```text
main
```

as the production branch.

Feature branches should be used when a change is substantial enough to warrant a pull request.

The CMS will ultimately publish content to the production branch.

---

# 18. Visual Design System

The visual design should communicate:

* Professionalism
* Technical competence
* Personality
* Editorial sophistication
* Modern web development

The site should resemble a **modern professional magazine** more than a traditional corporate resume.

## 18.1 Primary Visual Language

Primary colors:

* Turquoise
* White
* Neutral grays
* Near-black for dark mode

Turquoise should be used as an accent rather than covering the entire interface.

Gradient treatments may be used for:

* Hero elements
* Section accents
* Buttons
* Decorative backgrounds
* Active states

The gradient should remain tasteful and restrained.

## 18.2 Typography

Typography should prioritize:

1. Readability.
2. Strong hierarchy.
3. Professional appearance.
4. Excellent mobile rendering.

The implementation should use a limited font system rather than excessive font variation.

---

# 19. Theme System

The website will support:

* Light mode.
* Dark mode.

Default:

```text
Light
```

The user must be able to toggle themes manually.

The implementation should preferably use Tailwind's dark-mode capabilities and CSS variables/design tokens so that component colors remain consistent.

Theme state should persist across visits using client-side storage where appropriate.

The site must avoid a noticeable flash of the wrong theme during initial page load.

---

# 20. Responsive Design

The website must support:

* Mobile phones.
* Tablets.
* Laptops.
* Desktop monitors.
* Large desktop displays.

The layout should not simply shrink the desktop design.

Instead, components should adapt to available space.

For example:

```text
Desktop

┌──────────────┬────────────────────────────┐
│ Navigation   │ Resume / Content           │
│              │                            │
│              │                            │
└──────────────┴────────────────────────────┘


Mobile

┌─────────────────────────────┐
│ Navigation / Menu           │
├─────────────────────────────┤
│ Resume / Content            │
│                             │
│                             │
└─────────────────────────────┘
```

---

# 21. Navigation

Navigation should provide access to:

* Resume/home.
* Blog.
* Contact.
* Theme toggle.

Desktop navigation may use a horizontal or editorial-style navigation system.

Mobile navigation should collapse into an accessible menu.

Navigation should remain visually lightweight so the resume remains the primary focus.

---

# 22. Accessibility

Accessibility is a first-class requirement.

Interactive components must be usable without a mouse.

Accordion requirements include:

* Keyboard activation.
* Proper focus handling.
* Appropriate button semantics.
* `aria-expanded`.
* Relationship between trigger and content.
* Visible focus states.
* Logical tab order.

The implementation should prefer semantic HTML over ARIA-heavy custom components whenever possible.

The site should aim for WCAG 2.2 AA-oriented behavior.

---

# 23. Reduced Motion

The site must respect:

```css
prefers-reduced-motion
```

When enabled:

* Disable bouncing.
* Reduce slide transitions.
* Reduce decorative animation.
* Keep state changes understandable.

Accessibility takes precedence over visual animation.

---

# 24. SEO

The application should include:

* Page titles.
* Meta descriptions.
* Canonical URLs.
* Open Graph metadata.
* Social sharing metadata.
* Sitemap.
* Robots configuration.
* Semantic headings.
* Structured data where appropriate.

Blog posts should have individually generated metadata based on their frontmatter.

Example:

```text
/blog/building-my-interactive-resume
```

should generate its own:

* Title.
* Description.
* Canonical URL.
* Publication date.
* Open Graph metadata.

---

# 25. Blog SEO

Each blog post should include:

```ts
interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
}
```

The blog index should display posts in reverse chronological order.

Unpublished posts must not appear in the production site.

---

# 26. URLs and Routing

Recommended routes:

```text
/
 /blog
 /blog/[slug]
 /contact
 /admin
```

The resume will remain primarily associated with `/`.

Blog posts will use stable slugs.

Example:

```text
/blog/building-my-interactive-resume
```

Changing a title should not automatically change an established slug unless explicitly desired.

---

# 27. Content Validation

Content should be validated before building.

Invalid content should cause the production build to fail rather than silently producing broken pages.

Examples of validation failures:

* Missing title.
* Missing slug.
* Invalid date.
* Invalid required field.
* Duplicate slug.
* Invalid content structure.

A typed content parsing layer should sit between raw MDX/frontmatter and the UI.

---

# 28. Suggested Project Structure

A more complete initial repository could look like:

```text
resume-site/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── public/
│   ├── images/
│   ├── icons/
│   └── ...
│
├── content/
│   └── blog/
│       ├── example-post.mdx
│       └── ...
│
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── blog/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── resume/
│   │   ├── theme/
│   │   └── ui/
│   │
│   ├── data/
│   │   ├── certifications.ts
│   │   ├── education.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── resume.ts
│   │
│   ├── lib/
│   │   ├── blog/
│   │   ├── content/
│   │   └── utils/
│   │
│   └── types/
│       ├── blog.ts
│       └── resume.ts
│
├── admin/
│   ├── index.html
│   └── config.yml
│
├── mdx-components.tsx
├── next.config.ts
├── package.json
├── bun.lock
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

The exact locations may change based on the selected Next.js/Tailwind versions and configuration.

---

# 29. Performance Requirements

The site should prioritize fast initial loading.

Requirements:

* Static HTML generation wherever possible.
* Optimized images.
* Minimal JavaScript.
* Avoid unnecessary client components.
* Lazy-load non-critical interactive functionality.
* Avoid large UI libraries unless justified.
* Use modern image formats where appropriate.
* Keep animation implementations lightweight.

The resume should remain useful even if JavaScript is slow or temporarily unavailable.

---

# 30. Client vs. Server Components

The default should be:

**Server Components unless client-side behavior is required.**

Client Components should be reserved for functionality such as:

* Accordion state.
* Theme toggle.
* Mobile navigation.
* Animations requiring client state.
* Other genuinely interactive controls.

Static content should remain server-rendered/static whenever possible.

This minimizes the client-side JavaScript footprint.

---

# 31. Security

The public site should have a minimal attack surface because it does not expose a traditional application backend.

Security considerations include:

* No private credentials committed to Git.
* CMS authentication handled through the supported GitHub authentication mechanism.
* GitHub Actions secrets used only where necessary.
* Dependencies kept current.
* CMS/admin route protected by authentication.
* User-provided MDX content treated carefully.
* No arbitrary untrusted JavaScript execution from CMS content.

MDX should be considered executable content because it can contain component syntax. Only trusted authors should be able to publish MDX containing custom components.

---

# 32. Decap CMS Security Model

The CMS should not be considered an independent secure database.

The GitHub repository remains the source of truth.

Access should therefore be limited to the intended author/editor account(s).

Decap's GitHub backend operates against the configured repository and branch, so repository permissions are an important part of the CMS security model.

---

# 33. Testing Strategy

Testing should remain proportional to the scope of the application.

## 33.1 Static Validation

Every production build should perform:

* TypeScript checking.
* ESLint.
* Production build.
* Content validation.

## 33.2 Component Testing

Components with meaningful behavior should receive tests.

Priority:

1. Accordion.
2. Theme toggle.
3. Navigation menu.
4. Blog content parsing.
5. Content validation.

Simple presentational components do not require exhaustive tests.

## 33.3 Accessibility Testing

Test:

* Keyboard navigation.
* Focus behavior.
* Screen reader semantics.
* Color contrast.
* Reduced-motion behavior.
* Mobile interaction.

## 33.4 Link Testing

The CI pipeline should eventually verify:

* Internal links.
* Blog URLs.
* External links where practical.

## 33.5 Manual Browser Testing

Before production releases, test at minimum:

* Desktop Chromium.
* Mobile Chromium.
* Safari/iOS if available.
* Firefox.

---

# 34. Development Workflow

Local development:

```text
bun install
bun dev
```

Validation:

```text
bun lint
bun typecheck
bun test
```

Production build:

```text
bun run build
```

The exact scripts should be finalized when the project is scaffolded.

---

# 35. Environment Configuration

Environment-specific configuration should be kept separate from source code.

Potential values may include:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GITHUB_REPOSITORY
```

Secrets must never use `NEXT_PUBLIC_` unless they are intentionally public.

The initial implementation should minimize environment variables.

---

# 36. GitHub Pages Considerations

The site must account for whether it is deployed:

```text
https://username.github.io/
```

or:

```text
https://username.github.io/repository/
```

or through a custom domain:

```text
https://example.com/
```

The application should be configured so that changing the deployment target does not require rewriting application routes.

A custom domain should be supported as a future configuration option.

---

# 37. Custom Domain

The architecture should support adding a custom domain later.

A future custom domain should require configuration rather than application redesign.

Potential future domain:

```text
https://www.example.com
```

The exact domain is intentionally outside the scope of this specification.

---

# 38. Blog Index

The blog index should provide:

* Post title.
* Short description.
* Date.
* Tags.
* Optional image.
* Read-more link.

Posts should be ordered newest-first.

The design should feel editorial rather than resembling a generic blog template.

Potential layout:

```text
BLOG

Featured Article
─────────────────────────────────────────────
Large image

Article Title
Short description...
Read article →

─────────────────────────────────────────────

Recent Articles

Article     Article
Article     Article
Article     Article
```

---

# 39. Blog Post Presentation

Individual blog posts should have:

* Strong title.
* Publication date.
* Reading-oriented typography.
* Clear heading hierarchy.
* Comfortable line length.
* Code formatting where necessary.
* Image support.
* Blockquote styling.
* Lists.
* Links.
* Optional table of contents for longer posts.

The reading experience should prioritize legibility over decorative UI.

---

# 40. Editorial Design Principles

The website should use a magazine-inspired layout system.

Recommended characteristics:

* Large typography.
* Generous whitespace.
* Strong section divisions.
* Editorial-style cards.
* Asymmetric visual elements where appropriate.
* Turquoise accent gradients.
* Subtle borders.
* Restrained shadows.
* Strong visual hierarchy.
* Carefully controlled animation.

Avoid:

* Excessive gradients.
* Excessive glassmorphism.
* Excessive drop shadows.
* Constant motion.
* Overly large navigation.
* Generic portfolio-template appearance.

The overall impression should be:

**professional + technical + editorial + personal.**

---

# 41. Animation System

Animation should be centralized rather than independently invented by every component.

Suggested animation categories:

```text
motion/
├── fade-in
├── pop-in
├── accordion-open
├── accordion-close
├── hover-lift
├── navigation
└── page-transition
```

Not every component needs animation.

Animation should communicate state or hierarchy.

---

# 42. Accessibility and Animation Relationship

The animation system must include reduced-motion variants.

Example:

```text
Normal:
scale + opacity + translation + spring

Reduced motion:
opacity only
```

The visual design should remain understandable even when animation is disabled.

---

# 43. Future Extensibility

The architecture should allow future features without major restructuring.

Potential future additions:

* Project case studies.
* Search.
* Blog categories.
* RSS.
* Newsletter.
* Additional content types.
* Interactive technical demonstrations.
* Data visualizations inside MDX.
* Downloadable PDF resume.
* Multiple resume variants.
* Internationalization.

These are explicitly not required for version 1.

---

# 44. Recommended Implementation Phases

## Phase 1 — Project Foundation

* Initialize Next.js.
* Configure TypeScript.
* Configure Bun.
* Configure Tailwind.
* Configure App Router.
* Configure static export.
* Establish repository structure.
* Establish GitHub Actions.
* Deploy basic site to GitHub Pages.

**Acceptance criteria:** A minimal Next.js page successfully deploys to GitHub Pages.

---

## Phase 2 — Design System

* Establish typography.
* Establish color tokens.
* Establish turquoise gradients.
* Establish light/dark themes.
* Create base UI primitives.
* Create responsive layout system.
* Create animation primitives.

**Acceptance criteria:** The application has a cohesive responsive visual system.

---

## Phase 3 — Resume

Implement:

* Hero.
* Summary.
* Skills.
* Experience.
* Education.
* Projects.
* Certifications.
* Contact.

Implement the reusable accordion system.

**Acceptance criteria:** All resume sections work independently and multiple sections can remain open simultaneously.

---

## Phase 4 — Accessibility

* Keyboard navigation.
* Screen-reader semantics.
* Focus states.
* Reduced-motion support.
* Contrast validation.

**Acceptance criteria:** Resume interactions are fully usable without a mouse.

---

## Phase 5 — Blog Engine

* MDX support.
* Frontmatter parsing.
* Blog index.
* Dynamic post routes.
* Metadata generation.
* MDX component system.
* Content validation.

**Acceptance criteria:** An `.mdx` file added to the repository automatically becomes a blog post after a production build.

---

## Phase 6 — Decap CMS

* `/admin`.
* GitHub authentication.
* Blog collection.
* Post editing.
* Media configuration.
* Publishing workflow.

**Acceptance criteria:** A blog post can be created through Decap CMS and committed to the repository.

---

## Phase 7 — Automated Publishing

* CMS commit triggers GitHub Actions.
* CI validation runs.
* Static site builds.
* GitHub Pages deployment occurs.

**Acceptance criteria:** Publishing a blog post through Decap results in the post becoming available on the public website without manually running a local build.

---

## Phase 8 — SEO & Polish

* Metadata.
* Sitemap.
* Robots.
* Open Graph.
* Structured data.
* Performance optimization.
* Final responsive refinement.
* Animation refinement.

**Acceptance criteria:** The site is production-ready.

---

# 45. Definition of Done

Version 1 will be considered complete when:

* [ ] Next.js application builds successfully.
* [ ] Bun is the project's package manager/runtime workflow.
* [ ] TypeScript has no errors.
* [ ] ESLint passes.
* [ ] Tailwind CSS is configured.
* [ ] Site deploys successfully to GitHub Pages.
* [ ] Resume sections are interactive.
* [ ] Multiple accordion sections can remain open.
* [ ] Accordion animation is implemented.
* [ ] Pop-in animations are implemented where appropriate.
* [ ] Reduced-motion behavior exists.
* [ ] Light mode is the default.
* [ ] Dark mode can be selected.
* [ ] Theme preference persists.
* [ ] Site is responsive.
* [ ] Blog index exists.
* [ ] Blog posts use MDX.
* [ ] Blog routes are generated statically.
* [ ] Blog metadata is generated.
* [ ] Decap CMS is available at `/admin`.
* [ ] Decap CMS can create/edit blog content.
* [ ] CMS content is stored in GitHub.
* [ ] GitHub Actions automatically builds the site.
* [ ] GitHub Actions automatically deploys the site.
* [ ] Accessibility requirements are met.
* [ ] SEO fundamentals are implemented.
* [ ] Production build validates content.
* [ ] Core interactive components have automated tests.
* [ ] Documentation explains local development and publishing.

---

# 46. Architectural Principles

The following principles should guide implementation decisions.

### Principle 1 — Static by Default

If something can happen at build time, it should.

### Principle 2 — Content Is Data

Resume and blog content should not be tightly coupled to presentation components.

### Principle 3 — Server by Default

Use Next.js Server Components unless client-side behavior is actually required.

### Principle 4 — Progressive Enhancement

The website should remain useful even if animations or nonessential JavaScript are unavailable.

### Principle 5 — Accessibility Before Animation

Visual effects must never compromise usability.

### Principle 6 — Minimal Dependencies

Every dependency should have a clear purpose.

### Principle 7 — GitHub Is the Source of Truth

The repository should contain the application's source code and content.

### Principle 8 — Don't Overbuild

This is a personal professional website, not an enterprise CMS.

The architecture should remain understandable to one developer.

---

# 47. Key Architectural Decision Record

## Decision

Use:

**Next.js + TypeScript + Bun + Tailwind CSS + MDX + Decap CMS + GitHub Actions + GitHub Pages**

## Rationale

This combination provides:

* A modern React framework.
* Strong typing.
* Fast local development.
* Utility-first styling.
* Rich content capabilities.
* Git-based CMS functionality.
* Static deployment.
* Minimal infrastructure.
* Low ongoing cost.
* Excellent extensibility.

The architecture avoids introducing a traditional backend or database while still providing a usable content-management experience.

---

# 48. Final Architecture

The final intended system is:

```text
                         AUTHOR
                           │
                           ▼
                  ┌─────────────────┐
                  │    Decap CMS    │
                  │     /admin      │
                  └────────┬────────┘
                           │
                           │ Git commit
                           ▼
                  ┌─────────────────┐
                  │     GitHub      │
                  │                 │
                  │ Resume Data     │
                  │ MDX Blog Posts  │
                  │ Source Code     │
                  └────────┬────────┘
                           │
                           │ Push
                           ▼
                  ┌─────────────────┐
                  │ GitHub Actions  │
                  │                 │
                  │ Lint            │
                  │ Typecheck       │
                  │ Test            │
                  │ Build           │
                  └────────┬────────┘
                           │
                           │ Static artifact
                           ▼
                  ┌─────────────────┐
                  │  GitHub Pages   │
                  └────────┬────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Visitor   │
                    │   Browser    │
                    └──────────────┘
```

This architecture should be treated as the baseline for implementation. Individual implementation details may evolve as the application is built, but changes should preserve the core principles of static generation, Git-based content management, strong separation of concerns, accessibility, and minimal infrastructure.
