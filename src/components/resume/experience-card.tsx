import type { Experience } from "@/types/resume";
import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/utils/dates";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
      <header>
        <h4 className="text-base font-semibold text-foreground">
          {experience.title} · {experience.company}
        </h4>
        <p className="text-sm text-muted">
          {formatDateRange(experience.startDate, experience.endDate)}
          {experience.location ? ` · ${experience.location}` : ""}
        </p>
      </header>
      <p className="text-sm text-foreground">{experience.summary}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
        {experience.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {experience.accomplishments?.length ? (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          {experience.accomplishments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {experience.technologies?.length ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {experience.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      ) : null}
    </article>
  );
}
