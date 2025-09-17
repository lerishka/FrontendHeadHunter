import { useLoaderData } from "react-router-dom";
import Card from "../../ui/Card/Card";
import DescriptionCard from "../../ui/DescriptionCard/DescriptionCard";
import styles from "./VacancyPage.module.scss";

export default function VacancyPage() {
  const vacancy = useLoaderData();

  if (!vacancy)
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
