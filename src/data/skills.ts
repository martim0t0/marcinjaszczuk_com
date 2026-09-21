import type { SkillGroup } from "@/types/resume";

export const skillGroups: SkillGroup[] = [
  {
    id: "crm-erp",
    name: "CRM / ERP",
    skills: ["Salesforce (Admin)", "Apttus/Conga CLM", "SAP"],
  },
  {
    id: "bi-data",
    name: "BI & Data",
    skills: ["Domo", "Tableau", "SQL (ETL)", "Informatica"],
  },
  {
    id: "project-tools",
    name: "Project Tools",
    skills: ["Jira", "Confluence", "Agile/Scrum", "SAFe"],
  },
  {
    id: "programming",
    name: "Programming",
    skills: ["SQL", "VBA", "Python (basic)", "JavaScript"],
  },
  {
    id: "soft-skills",
    name: "Soft Skills",
    skills: [
      "Stakeholder Management",
      "UAT/Test Strategy",
      "Business Process Optimization",
    ],
  },
  {
    id: "other",
    name: "Other",
    skills: ["GitHub", "Adobe Photoshop", "Bilingual (English/Polish)"],
  },
];
