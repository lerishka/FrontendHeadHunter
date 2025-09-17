import Card from "../../ui/Card/Card";
import type { VacancyCard } from "../../types/types";
import styles from "./VacancyList.module.scss";

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
