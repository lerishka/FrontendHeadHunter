import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { VacancyCard, WorkFormat } from "../types/types";

export const vacanciesApi = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.hh.ru/" }),
  endpoints: (builder) => ({
    getVacancies: builder.query<
      VacancyCard[],
      { searchText?: string; cityId?: string; skills?: string[]; page?: number }
    >({
      query: ({ searchText = "", cityId = "all", skills = [], page = 1 }) => {
        const params = new URLSearchParams();
        let searchQuery = searchText;

        if (skills.length > 0) {
          const skillsQuery = skills.join(" OR ");
          if (searchQuery) {
            searchQuery += ` AND (${skillsQuery})`;
          } else {
            searchQuery = skillsQuery;
          }
        }
        if (searchQuery) {
          params.append("text", searchQuery);
          params.append("search_field", "name");
          params.append("search_field", "company_name");
        }

        if (!(cityId === "all")) {
          params.append("area", cityId);
        } else {
          params.delete("area");
        }
        params.append("page", page.toString());
        params.append("per_page", "10");

        return `vacancies?${params.toString()}`;
      },

      transformResponse: (response: { items: any[] }) =>
        response.items.map((item) => {
          const workFormat: WorkFormat[] = item.work_format?.length
            ? item.work_format.map((format: any) => format.id as WorkFormat)
            : [];

          return {
            id: item.id,
            name: item.name,
            salaryFrom: item.salary?.from,
            salaryTo: item.salary?.to,
            currency: item.salary?.currency,
            experience: item.experience?.name,
            company: item.employer.name,
            workFormats: workFormat,
            city: item.area.name,
            directLink: item.alternate_url,
            description: "",
          };
        }),
    }),

    getVacancyById: builder.query<VacancyCard, string>({
      query: (id) => `vacancies/${id}`,
      transformResponse: (item: any) => {
        const workFormat: WorkFormat[] = item.work_format?.length
          ? item.work_format.map((format: any) => format.id as WorkFormat)
          : [];

        return {
          id: item.id,
          name: item.name,
          salaryFrom: item.salary?.from,
          salaryTo: item.salary?.to,
          currency: item.salary?.currency,
          experience: item.experience?.name,
          company: item.employer.name,
          workFormats: workFormat,
          city: item.area.name,
          directLink: item.alternate_url,
          description: item.description,
        };
      },
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyByIdQuery } = vacanciesApi;
