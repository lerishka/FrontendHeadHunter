import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
