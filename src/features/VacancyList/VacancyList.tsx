import { useTypedSelector } from "../../hooks/redux";
import { useGetVacanciesQuery } from "../../services/vacanciesApi";
import Card from "../../ui/Card/Card";
import styles from "./VacancyList.module.scss";
import type { VacancyCard } from "../../types/types";

export default function VacancyList({
  vacancies,
}: {
  vacancies: VacancyCard[];
}) {
  return (
    <div className={styles.vacancyListWrapper}>
      <ul className={styles.cardListWrapper}>
        {vacancies?.map((v) => {
          return (
            <li key={v.id}>
              <Card {...v} variant="list" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
