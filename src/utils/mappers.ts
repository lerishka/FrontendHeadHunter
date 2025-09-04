import type { VacancyCard } from "../types/types";

export function mapVacancyToCard(v: any): VacancyCard {
  return {
    id: v.id,
    name: v.name,
    salaryFrom: v.salary?.from ?? undefined,
    salaryTo: v.salary?.to ?? undefined,
    currency: v.salary?.currency ?? undefined,
    experience: v.experience?.name || "Не указано",
    company: v.employer?.name || "Не указано",
    city: v.area?.name || "Не указан",
    workFormats: v.work_format?.map((f: any) => f.id) || [],
    directLink: v.alternate_url,
  };
}
