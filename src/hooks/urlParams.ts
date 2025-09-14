import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "./redux";
import { setSearchText, setCityId, setSkills } from "../store/vacanciesSlice";

export default function useSyncFiltersWithURL() {
  const dispatch = useTypedDispatch();
  const filters = useTypedSelector((state) => state.vacancies.filters);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchText = searchParams.get("searchText") ?? filters.searchText;
    const cityId = searchParams.get("cityId") ?? filters.cityId;
    const skills = searchParams.get("skills")?.split(",") ?? filters.skills;

    dispatch(setSearchText(searchText));
    dispatch(setCityId(cityId));
    dispatch(setSkills(skills));
  }, []);

  useEffect(() => {
    setSearchParams({
      searchText: filters.searchText,
      cityId: filters.cityId,
      skills: filters.skills.join(","),
    });
  }, [filters]);
}
