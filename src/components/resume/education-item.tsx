import type { Education } from "@/types/resume";
import { formatDateRange } from "@/lib/utils/dates";

export function EducationItem({ education }: { education: Education }) {
  return (
    <article className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
      <h4 className="text-base font-semibold text-foreground">
        {education.degree}
        {education.field ? `, ${education.field}` : ""}
      </h4>
      <p className="text-sm text-muted">{education.institution}</p>
      {education.startDate ? (
        <p className="text-sm text-muted">
          {formatDateRange(education.startDate, education.endDate)}
        </p>
      ) : null}
      {education.description ? (
        <p className="text-sm text-foreground">{education.description}</p>
      ) : null}
    </article>
  );
}
