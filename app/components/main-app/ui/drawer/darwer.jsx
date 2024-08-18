"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Logout from "@/app/logout/Logout";
import { AuthContext } from "@/app/AuthContext";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userDetails } = useContext(AuthContext);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleDrawer}>
        ☰
      </button>
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={toggleDrawer}>
          ×
        </button>
        <Link href="/login" className={styles.link}>
          Login
        </Link>
        <Link href="/register" className={styles.link}>
          Sign Up
        </Link>
        {/* <Link href="/login" className={styles.link}>
          Sign Out
        </Link> */}
        <Logout />
      </div>
    </>
  );
};

export default Drawer;
