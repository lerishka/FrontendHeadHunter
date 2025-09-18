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
    const cityIdFromPath = location.pathname.includes("petersburg") ? "2" : "1";
    dispatch(setCityId(cityIdFromPath));
  }, [location.pathname]);

  useEffect(() => {
    const searchText = searchParams.get("searchText") ?? filters.searchText;
    const skills = searchParams.get("skills")?.split(",") ?? filters.skills;
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    dispatch(setSearchText(searchText));
    dispatch(setSkills(skills));
    dispatch(setPage(page));
  }, [searchParams]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.searchText) params.searchText = filters.searchText;
    if (filters.skills.length > 0) params.skills = filters.skills.join(",");
    if (filters.page && filters.page !== 1)
      params.page = filters.page.toString();

    setSearchParams(params, { replace: true });
  }, [filters.searchText, filters.skills, filters.page]);
}
