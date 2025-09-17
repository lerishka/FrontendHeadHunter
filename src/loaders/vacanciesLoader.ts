import { store } from "../store";
import { vacanciesApi } from "../services/vacanciesApi";

export const vacanciesLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  let cityId = "1";
  if (pathname.includes("/petersburg")) cityId = "2";

  const searchText = url.searchParams.get("searchText") ?? "";
  const skills = url.searchParams.get("skills")
    ? url.searchParams.get("skills")!.split(",")
    : ["React", "Vue", "Svelte"];
  const page = Number(url.searchParams.get("page") ?? 1);

  const result = await store.dispatch(
    vacanciesApi.endpoints.getVacancies.initiate({
      searchText,
      cityId,
      skills,
      page,
    })
  );

  if ("error" in result) throw result.error;
  return result.data;
};
