"use client";

import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import AdminAuthGuard from "../components/main-app/ui/auth-guard/AdminAuthGuard";

const DashBoard = () => {
  const { userDetails } = useContext(AuthContext);
  if (userDetails?.userEmail !== "admin@yahoo.com") return <AdminAuthGuard />;
  return (
    <h1 className="text-center mt-5 mb-5">
      Welcome to Reserve Mate Administration Panel
    </h1>
  );
};

export default DashBoard;
