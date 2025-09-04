import Title from "../../ui/Title/Title";
import SearchBar from "../../features/Filters/SearchBar/SearchBar";
import SkillsFilter from "../../features/Filters/SkillsFilter/SkillsFilter";
import CityFilter from "../../features/Filters/CityFilter/CityFilter";
import VacancyList from "../../features/VacancyList/VacancyList";
import { useEffect } from "react";
import { fetchVacancies } from "../../store/vacanciesSlice";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import Pagination from "../../ui/Pagination/Pagination";
import type { RootState } from "../../store";
import styles from "./VacanciesPage.module.scss";

export default function VacanciesPage() {
  const dispatch = useTypedDispatch();
  const { filters, vacancies, status, error } = useTypedSelector(
    (state: RootState) => state.vacancies
  );

  const isLoading = status === "loading";
  const emptyResult = vacancies.length === 0;
  const isError = status === "rejected";

  useEffect(() => {
    console.log("Dispatching fetchVacancies");
    dispatch(fetchVacancies());
  }, [filters.cityId, filters.skills, filters.searchText, filters.page]);

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.pageTitleWrapper}>
          <Title />
          <SearchBar />
        </div>
        <div className={styles.lineWrapper}>
          <hr />
        </div>
        <div className={styles.mainPartOfPage}>
          <div className={styles.filtersWrapper}>
            <SkillsFilter />
            <CityFilter />
          </div>
          {isLoading && <div className={styles.loading}>Идет загрузка</div>}
          {!isLoading && isError && (
            <div className={styles.loading}>Ошибка: {error}</div>
          )}
          {!isLoading && !isError && emptyResult && (
            <div className={styles.loading}>Нет результатов</div>
          )}
          {!isLoading && !emptyResult && (
            <div className={styles.vacanciesPartWrapper}>
              <VacancyList />
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
