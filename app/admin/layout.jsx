import { Fragment } from "react";
import SideBar from "../components/admin/layouts/SideBar";
export default function RootLayout({ children }) {
  return (
    <Fragment>
      <SideBar></SideBar>
      <main>{children}</main>
    </Fragment>
  );
}
