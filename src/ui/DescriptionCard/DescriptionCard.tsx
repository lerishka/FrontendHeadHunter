import styles from "./DescriptionCard.module.scss";
import type { VacancyCard } from "../../types/types";

type CardProps = VacancyCard;

function cleanHtmlWithDom(htmlString: string) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || "";
}

export default function DescriptionCard({ description }: CardProps) {
  return (
    <div className={styles.descriptionWrapper}>
      <h3 className={styles.header}>Компания</h3>
      <p>{cleanHtmlWithDom(description!)}</p>
    </div>
  );
}
