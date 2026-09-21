export interface SkillGroup {
  id: string;
  name: string;
  skills: string[];
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  accomplishments?: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  repository?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expirationDate?: string;
  credentialUrl?: string;
}

export interface ContactInfo {
  email: string;
  location?: string;
  links: { label: string; url: string }[];
}

export interface Resume {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}
