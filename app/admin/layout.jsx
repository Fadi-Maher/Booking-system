import { Fragment } from "react";
import SideBar from "../components/admin/layouts/SideBar";
import styles from "./RootLayout.module.css";
import { Container } from "react-bootstrap";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <SideBar />
      <main className={styles["admin-panel-content"]}>
        <Container>{children}</Container>
      </main>
    </Fragment>
  );
}
