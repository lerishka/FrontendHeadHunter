import { store } from "../store";
import { vacanciesApi } from "../services/vacanciesApi";

export const vacancyLoader = async ({ params }: any) => {
  const id = params.id;

  const result = await store.dispatch(
    vacanciesApi.endpoints.getVacancyById.initiate(id)
  );

  if ("error" in result) throw result.error;
  return result.data;
};
