import { useParams } from "react-router-dom";
import Card from "../../ui/Card/Card";
import styles from "./VacancyPage.module.scss";
import { useGetVacancyByIdQuery } from "../../services/vacanciesApi";
import DescriptionCard from "../../ui/DescriptionCard/DescriptionCard";

export default function VacancyPage() {
  const { id } = useParams();
  const { data: vacancy, isLoading, isError } = useGetVacancyByIdQuery(id!);

  if (isLoading)
    return (
      <div className={styles.pageWrapper}>
        <p>Загрузка вакансии</p>
      </div>
    );

  if (!vacancy || isError)
    return (
      <div className={styles.pageWrapper}>
        <p>Вакансия не найдена</p>
      </div>
    );

  return (
    <div className={styles.pageWrapper}>
      <Card {...vacancy} variant="details" />
      <DescriptionCard {...vacancy} />
    </div>
  );
}
