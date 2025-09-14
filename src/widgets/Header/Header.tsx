import { NavLink } from "react-router-dom";
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
            <NavLink
              to="/vacancies"
              className={({ isActive }) =>
                isActive ? `${styles.myLink} ${styles.active}` : styles.myLink
              }
            >
              Вакансии FE
            </NavLink>
            <span className={styles.dot}></span>
          </div>

          <div className={styles.link}>
            <IconUserCircle
              color={theme.colors.gray[3]}
              size={24}
              stroke={1.5}
            />
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive ? `${styles.myLink} ${styles.active}` : styles.myLink
              }
            >
              Обо мне
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
