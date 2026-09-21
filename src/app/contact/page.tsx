import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { resume } from "@/data/resume";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${resume.name}.`,
};

export default function ContactPage() {
  return (
    <Container className="flex flex-col gap-4 py-16">
      <SectionHeading as="h1">Contact</SectionHeading>
      <p className="text-sm text-foreground">
        Reach out at{" "}
        <a
          href={`mailto:${resume.contact.email}`}
          className="text-accent-strong hover:underline"
        >
          {resume.contact.email}
        </a>
        , or see the{" "}
        <Link href="/#contact" className="text-accent-strong hover:underline">
          contact section
        </Link>{" "}
        on the resume for links.
      </p>
    </Container>
  );
}
