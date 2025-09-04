import styles from "./Title.module.scss";

const searchText = "Frontend-разработчик";

export default function Title() {
  return (
    <div className={styles.titleWrapper}>
      <h2 className={styles.title}>Список вакансий</h2>
      <p className={styles.subTitle}>по профессии {searchText}</p>
    </div>
  );
}
