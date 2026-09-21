import type { Certification } from "@/types/resume";

export function CertificationItem({
  certification,
}: {
  certification: Certification;
}) {
  const content = (
    <>
      <h4 className="text-base font-semibold text-foreground">
        {certification.name}
      </h4>
      <p className="text-sm text-muted">
        {certification.issuer}
        {certification.issueDate ? ` · ${certification.issueDate}` : ""}
      </p>
    </>
  );

  return (
    <article className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
      {certification.credentialUrl ? (
        <a
          href={certification.credentialUrl}
          className="hover:underline"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
}
