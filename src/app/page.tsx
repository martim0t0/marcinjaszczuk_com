import { Container } from "@/components/ui/container";
import { Hero } from "@/components/resume/hero";
import { ContactSection } from "@/components/resume/contact-section";
import { ResumeAccordion } from "@/components/resume/resume-accordion";
import { ExperienceCard } from "@/components/resume/experience-card";
import { SkillGroupDisplay } from "@/components/resume/skill-group-display";
import { EducationItem } from "@/components/resume/education-item";
import { ProjectCard } from "@/components/resume/project-card";
import { CertificationItem } from "@/components/resume/certification-item";
import { resume } from "@/data/resume";

export default function Home() {
  return (
    <Container className="pb-16">
      <Hero resume={resume} />

      <div className="flex flex-col gap-4">
        <ResumeAccordion title="Summary" defaultOpen>
          <p className="text-sm text-foreground">{resume.summary}</p>
        </ResumeAccordion>

        {resume.skills.length > 0 ? (
          <ResumeAccordion
            title="Skills"
            summary={`${resume.skills.length} groups`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {resume.skills.map((group) => (
                <SkillGroupDisplay key={group.id} group={group} />
              ))}
            </div>
          </ResumeAccordion>
        ) : null}

        {resume.experience.length > 0 ? (
          <ResumeAccordion
            title="Experience"
            summary={`${resume.experience.length} roles`}
            defaultOpen
          >
            <div className="divide-y divide-border">
              {resume.experience.map((item) => (
                <ExperienceCard key={item.id} experience={item} />
              ))}
            </div>
          </ResumeAccordion>
        ) : null}

        {resume.education.length > 0 ? (
          <ResumeAccordion
            title="Education"
            summary={`${resume.education.length} entries`}
          >
            <div className="divide-y divide-border">
              {resume.education.map((item) => (
                <EducationItem key={item.id} education={item} />
              ))}
            </div>
          </ResumeAccordion>
        ) : null}

        {resume.projects.length > 0 ? (
          <ResumeAccordion
            title="Projects"
            summary={`${resume.projects.length} projects`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {resume.projects.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </ResumeAccordion>
        ) : null}

        {resume.certifications.length > 0 ? (
          <ResumeAccordion
            title="Certifications"
            summary={`${resume.certifications.length} certifications`}
          >
            <div className="divide-y divide-border">
              {resume.certifications.map((item) => (
                <CertificationItem key={item.id} certification={item} />
              ))}
            </div>
          </ResumeAccordion>
        ) : null}
      </div>

      <ContactSection contact={resume.contact} />
    </Container>
  );
}
