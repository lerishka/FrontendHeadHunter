import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "./redux";
import {
  setSearchText,
  setCityId,
  setSkills,
  setPage,
} from "../store/vacanciesSlice";

export default function useSyncFiltersWithURL() {
  const dispatch = useTypedDispatch();
  const filters = useTypedSelector((state) => state.vacancies.filters);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    let cityIdFromPath = "1";
    if (location.pathname.includes("petersburg")) cityIdFromPath = "2";

    const searchText = searchParams.get("searchText") ?? filters.searchText;
    const skills = searchParams.get("skills")?.split(",") ?? filters.skills;
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : filters.page;

    dispatch(setSearchText(searchText));
    dispatch(setCityId(cityIdFromPath));
    dispatch(setSkills(skills));
    dispatch(setPage(page));
  }, [location.pathname]);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (filters.searchText) params.searchText = filters.searchText;
    if (filters.skills.length > 0) params.skills = filters.skills.join(",");
    if (filters.page && filters.page !== 1)
      params.page = filters.page.toString();

    setSearchParams(params);
  }, [filters.searchText, filters.cityId, filters.skills, filters.page]);
}
