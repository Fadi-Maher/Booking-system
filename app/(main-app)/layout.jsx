import { Fragment } from "react";
import MainHeader from "../components/main-app/layout/MainHeader";
import Footer from "../components/main-app/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
