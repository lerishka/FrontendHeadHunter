import Title from "../../ui/Title/Title";
import SearchBar from "../../features/Filters/SearchBar/SearchBar";
import SkillsFilter from "../../features/Filters/SkillsFilter/SkillsFilter";
import VacancyList from "../../features/VacancyList/VacancyList";
import { useTypedSelector } from "../../hooks/redux";
import Pagination from "../../ui/Pagination/Pagination";
import type { RootState } from "../../store";
import { useGetVacanciesQuery } from "../../services/vacanciesApi";
import useSyncFiltersWithURL from "../../hooks/urlParams";
import { useLoaderData } from "react-router-dom";
import type { VacancyCard } from "../../types/types";
import { useEffect, useState } from "react";
import { LocationTabs } from "../../widgets/LocationTabs/LocationTabs";
import styles from "./VacanciesPage.module.scss";

export default function VacanciesPage() {
  const initialVacancies = useLoaderData() as VacancyCard[];
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useSyncFiltersWithURL();

  const { filters } = useTypedSelector((state: RootState) => state.vacancies);
  const {
    data: vacancies = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetVacanciesQuery(
    {
      searchText: filters.searchText,
      cityId: filters.cityId,
      skills: filters.skills,
      page: filters.page,
    },
    { skip: isInitialLoad }
  );

  useEffect(() => {
    if (initialVacancies.length > 0) {
      setIsInitialLoad(false);
    }
  }, [initialVacancies]);

  if (isInitialLoad && initialVacancies.length === 0) {
    return <div>Загрузка...</div>;
  }

  const emptyResult = vacancies.length === 0;

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
            {/* <CityFilter /> */}
          </div>
          {!isLoading && isError && (
            <div className={styles.loading}>
              Ошибка: {JSON.stringify(error)}
            </div>
          )}
          {!isLoading && !isError && emptyResult && (
            <div className={styles.loading}>Нет результатов</div>
          )}
          {!isLoading && !emptyResult && (
            <div className={styles.vacanciesPartWrapper}>
              <div className={styles.tabsWrapper}>
                <LocationTabs />
              </div>
              <VacancyList vacancies={vacancies} />
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
