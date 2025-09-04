import { type ReactNode } from "react";
import Header from "../../widgets/Header/Header";
import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
