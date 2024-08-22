"use client";
import React from "react";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();
  async function signOutUser() {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      toast.error("Logout failed.");
      console.log(error);
    }
  }
  return (
    <li>
      <span onClick={() => signOutUser()} type="submit" className="">
        Log Out
      </span>
    </li>
  );
};

export default Logout;
