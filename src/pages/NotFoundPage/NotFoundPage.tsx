import sadCat from "../../assets/sad-cat.gif";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headWrapper}>
        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>
            Упс! Такой страницы <br />
            не существует
          </h1>
          <p className={styles.subtitle}>Давайте перейдём к началу.</p>
        </div>
        <Button size="md" onClick={() => navigate("/vacancies/moscow")}>
          На главную
        </Button>
      </div>
      <img src={sadCat} alt="sad cat" style={{ borderRadius: 10 }} />
    </div>
  );
}
