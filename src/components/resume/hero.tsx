import type { Resume } from "@/types/resume";

export function Hero({ resume }: { resume: Resume }) {
  return (
    <header className="flex flex-col gap-4 py-10 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong">
        Resume
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {resume.name}
      </h1>
      <p className="text-lg text-muted">{resume.title}</p>
    </header>
  );
}
