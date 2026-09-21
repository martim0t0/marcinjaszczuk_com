import type { Resume } from "@/types/resume";
import { skillGroups } from "./skills";
import { experience } from "./experience";
import { education } from "./education";
import { projects } from "./projects";
import { certifications } from "./certifications";

export const resume: Resume = {
  name: "Marcin Jaszczuk",
  title: "Senior Business Systems Analyst",
  summary:
    "Senior Business Systems Analyst with 9+ years of experience in enterprise Salesforce ecosystems, SaaS implementation (Apttus/Conga, Domo, Tableau), and Agile delivery (Jira, SAFe). Proven track record translating business needs into scalable systems solutions across Fortune 500 and public sector environments. Bilingual communicator with a strong grasp of business intelligence, data strategy, and end-user training. Clearance-capable, systems-savvy, and outcome-focused.",
  contact: {
    email: "marcin@artificialhorizon.dev",
    location: "Nolanville, TX",
    links: [
      { label: "Website", url: "https://www.marcinjaszczuk.win" },
      { label: "GitHub", url: "https://github.com/martim0t0" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/martim0t0/" },
    ],
  },
  skills: skillGroups,
  experience,
  education,
  projects,
  certifications,
};
