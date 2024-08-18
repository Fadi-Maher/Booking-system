"use client";
import React from "react";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import styles from "../components/main-app/ui/drawer/page.module.css";

const Logout = () => {
  const router = useRouter();
  async function signOutUser() {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {/* <button onClick={() => signOutUser()} className="btn btn-outline-warning text-white" type="submit">Logout</button> */}
      <span onClick={() => signOutUser()} type="submit" className={styles.link}>
        Logout
      </span>
    </div>
  );
};

export default Logout;
