import type { SkillGroup } from "@/types/resume";
import { Badge } from "@/components/ui/badge";

export function SkillGroupDisplay({ group }: { group: SkillGroup }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold text-foreground">{group.name}</h4>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </div>
  );
}
