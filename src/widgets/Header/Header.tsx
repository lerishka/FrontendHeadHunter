import { IconUserCircle } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

export default function Header() {
  const theme = useMantineTheme();

  return (
    <header>
      <div className={styles["header-wrapper"]}>
        <div className={styles.left}>
          <a href="/">
            <img src={logo} className={styles.logo} alt="HH logo" />
          </a>
        </div>

        <div className={styles.center}>
          <div className={styles.link}>
            <p>Вакансии FE</p>
            <span className={styles.dot}></span>
          </div>

          <div className={styles.link}>
            <IconUserCircle
              color={theme.colors.gray[3]}
              size={24}
              stroke={1.5}
            />
            <p style={{ color: theme.colors.gray[3] }}>Обо мне</p>
          </div>
        </div>
      </div>
    </header>
  );
}
