import styles from "./UserPage.module.scss";

const name = "Цветкова Валерия";
const about =
  "Привет! Я - классная фронтендерка. Пишу приложения на React + TypeScript + Redux Toolkit.";

export default function UserPage() {
  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.title}>{name}</h2>
      <p>{about}</p>
    </div>
  );
}
