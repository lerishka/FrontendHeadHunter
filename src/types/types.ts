export type WorkFormat = "REMOTE" | "ON_SITE" | "HYBRID";

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
};
