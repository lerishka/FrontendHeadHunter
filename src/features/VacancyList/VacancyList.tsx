import { useTypedSelector } from "../../hooks/redux";
import Card from "../../ui/Card/Card";
import styles from "./VacancyList.module.scss";

export default function VacancyList() {
  const vacancies = useTypedSelector((state) => state.vacancies.vacancies);

  return (
    <div className={styles.vacancyListWrapper}>
      <ul className={styles.cardListWrapper}>
        {vacancies.map((v) => {
          return (
            <li key={v.id}>
              <Card {...v} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
