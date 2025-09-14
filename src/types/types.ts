export type WorkFormat = "REMOTE" | "ON_SITE" | "HYBRID" | "FIELD_WORK";

export type VacancyCard = {
  id: string;
  name: string;
  salaryFrom?: number;
  salaryTo?: number;
  currency?: string;
  experience: string;
  company: string;
  workFormats: WorkFormat[];
  city: string;
  directLink: string;
  description?: string;
};
