import Button from "../Button/Button";
import type { VacancyCard, WorkFormat } from "../../types/types";
import styles from "./Card.module.scss";

const workFormatColors: Record<WorkFormat, { label: string; color: string }> = {
  REMOTE: { label: "Можно удаленно", color: "#4263EB" },
  ON_SITE: { label: "Офис", color: "#E7E7E7" },
  HYBRID: { label: "Гибрид", color: "#0F0F10" },
};

type CardProps = VacancyCard;

export default function Card({
  name,
  salaryFrom,
  salaryTo,
  currency,
  experience,
  company,
  city,
  workFormats,
  directLink,
}: CardProps) {
  const handleDirectLink = (directLink: string) => {
    window.open(directLink, "_blank");
  };
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.infoBlock}>
        <p className={styles.vacancyName}>{name || "Название не указано"}</p>
        <div className={styles.additionalInfoBlock}>
          <p className={styles.mainInfo}>
            {salaryFrom && salaryTo
              ? `${salaryFrom} - ${salaryTo} ${currency || ""}`
              : salaryFrom
              ? `${salaryFrom} ${currency || ""}`
              : salaryTo
              ? `${salaryTo} ${currency || ""}`
              : "Зарплата не указана"}
          </p>

          <p className={styles.additionalInfo}>
            {experience || "Опыт не указан"}
          </p>
        </div>
      </div>

      <div className={styles.infoBlock}>
        <p className={styles.additionalInfo} style={{ marginBottom: "4px" }}>
          {company || "Компания не указана"}
        </p>
        <div className={styles.workFormats}>
          {workFormats.length > 0 ? (
            workFormats.map((format) => {
              const { label, color } = workFormatColors[format];
              return (
                <span
                  key={format}
                  style={{
                    backgroundColor: color,
                    color:
                      label.toLowerCase() === "офис" ? "#7B7B7B" : "#ffffff",
                  }}
                  className={styles.workFormatBadge}
                >
                  {label}
                </span>
              );
            })
          ) : (
            <span
              className={styles.workFormatBadge}
              style={{ backgroundColor: "#9e9e9e", color: "#fff" }}
            >
              Формат работы не указан
            </span>
          )}
        </div>
        <p className={styles.mainInfo}>{city || "Город не указан"}</p>
      </div>

      <div className={styles.actionButons}>
        <Button color="gray" className={styles.customButton}>
          Смотреть вакансию
        </Button>
        <Button
          color="gray"
          variant="light"
          className={styles.customButton}
          onClick={() => handleDirectLink(directLink)}
        >
          Откликнуться
        </Button>
      </div>
    </div>
  );
}
