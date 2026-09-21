import type { Experience } from "@/types/resume";

export const experience: Experience[] = [
  {
    id: "mirromar",
    company: "Mirromar Inc.",
    title: "Salesforce Business Analyst / PM",
    startDate: "2022-11",
    location: "Des Plaines, IL",
    summary:
      "Full-cycle Salesforce delivery for small business clients across diverse sectors.",
    responsibilities: [
      "Conducted full-cycle requirements gathering for small business clients across diverse sectors.",
      "Managed SaaS platforms: Salesforce, Apttus, Domo, Tableau.",
      "Wrote and refined Jira user stories, and managed UAT sessions.",
      "Delivered Salesforce implementations and enhancements with Apttus CLM integration.",
      "Authored BRDs and performed QA testing of all deliverables.",
    ],
    technologies: ["Salesforce", "Apttus", "Domo", "Tableau", "Jira"],
  },
  {
    id: "workday-vertisystem",
    company: "Workday (via Vertisystem)",
    title: "Salesforce Business Systems Analyst (Contract)",
    startDate: "2022-09",
    endDate: "2022-11",
    location: "Pleasanton, CA",
    summary:
      "Contract engagement translating business requirements into Salesforce and Conga CLM enhancements.",
    responsibilities: [
      "Gathered and translated business requirements into Salesforce and Conga CLM enhancements.",
      "Led cross-functional stakeholder sessions and aligned project goals with enterprise strategy.",
      "Created Jira artifacts and performed UAT with business owners and dev teams.",
    ],
    technologies: ["Salesforce", "Conga CLM", "Jira"],
  },
  {
    id: "blue-cross-blue-shield",
    company: "Blue Cross Blue Shield",
    title: "Salesforce / Apttus Business Analyst",
    startDate: "2019-03",
    endDate: "2019-07",
    location: "Chicago, IL",
    summary:
      "Apttus CLM configuration and Salesforce administration within a SAFe Agile team.",
    responsibilities: [
      "Configured and implemented Apttus CLM within Salesforce as System Admin.",
      "Operated within SAFe Agile framework, participating in daily standups and sprint planning.",
      "Developed state-specific contract templates using X-Author for Word.",
      "Delivered Salesforce training across regions, both in-person and remotely.",
    ],
    technologies: ["Salesforce", "Apttus CLM", "SAFe"],
  },
  {
    id: "abbott-molecular",
    company: "Abbott Molecular",
    title: "Salesforce Business & Data Analyst",
    startDate: "2015-06",
    endDate: "2019-03",
    location: "Des Plaines, IL",
    summary:
      "BI reporting, master data management, and full-cycle Apttus Quote-to-Cash solution management.",
    responsibilities: [
      "Built ad hoc BI reports using SQL/ETL and Salesforce data in Domo.",
      "Maintained master data (Informatica, SAP, Salesforce) to ensure data quality.",
      "Advised executive sales teams with strategic BI dashboards and insights.",
      "Delivered full-cycle Apttus Quote-to-Cash solution management.",
      "Developed Excel VBA tools and implemented UAT/training workflows.",
    ],
    technologies: ["Salesforce", "SQL", "Domo", "Informatica", "SAP", "VBA"],
  },
  {
    id: "earlier-roles",
    company: "Earlier Roles",
    title: "Sales & Business Analysis",
    startDate: "2008",
    endDate: "2015",
    summary: "Additional early-career roles in sales and business analysis.",
    responsibilities: [
      "Sales Representative, Stericycle (2014–2015)",
      "Sales Manager, State Farm (2012–2014)",
      "Pricing Manager / Business Analyst, Medline Industries (2008–2012)",
    ],
  },
];
