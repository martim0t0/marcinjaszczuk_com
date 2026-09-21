import type { ContactInfo } from "@/types/resume";
import { Card } from "@/components/ui/card";

export function ContactSection({ contact }: { contact: ContactInfo }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-10">
      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">
            Get in touch
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-accent-strong hover:underline"
          >
            {contact.email}
          </a>
          {contact.location ? (
            <p className="text-sm text-muted">{contact.location}</p>
          ) : null}
        </div>
        <div className="flex gap-4">
          {contact.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="text-sm font-medium text-accent-strong hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Card>
    </section>
  );
}
