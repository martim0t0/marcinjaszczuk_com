import type { Project } from "@/types/resume";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col gap-3">
      <h4 className="text-base font-semibold text-foreground">
        {project.name}
      </h4>
      <p className="text-sm text-foreground">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <div className="flex gap-4 text-sm font-medium">
        {project.url ? (
          <a
            href={project.url}
            className="text-accent-strong hover:underline"
          >
            View project
          </a>
        ) : null}
        {project.repository ? (
          <a
            href={project.repository}
            className="text-accent-strong hover:underline"
          >
            Source
          </a>
        ) : null}
      </div>
    </Card>
  );
}
