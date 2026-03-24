export type Project = {
  name: string;
  category: string;
  description: string;
  stack: string[];
  outcome: string;
  href: string;
  screenshot?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
};

export type Education = {
  school: string;
  program: string;
  period: string;
  summary: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};
