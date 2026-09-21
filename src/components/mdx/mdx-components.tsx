import type { MDXComponents } from "mdx/types";
import { Callout } from "./callout";

export const mdxComponents: MDXComponents = {
  Callout,
  h2: (props) => (
    <h2 className="mt-8 text-2xl font-semibold text-foreground" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 text-xl font-semibold text-foreground" {...props} />
  ),
  p: (props) => (
    <p className="mt-4 leading-relaxed text-foreground" {...props} />
  ),
  a: (props) => (
    <a className="text-accent-strong underline underline-offset-2" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-foreground" {...props} />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal space-y-1 pl-6 text-foreground"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 border-l-2 border-accent pl-4 italic text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg bg-surface p-4 text-sm"
      {...props}
    />
  ),
};
