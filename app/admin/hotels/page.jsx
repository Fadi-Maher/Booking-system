"use client";

import { AuthContext } from "@/app/AuthContext";
import HotelsTable from "@/app/components/admin/pages/hotels/HotelsTable";
import AdminAuthGuard from "@/app/components/main-app/ui/auth-guard/AdminAuthGuard";
import { useContext } from "react";

const HotelsManagement = () => {
  const { userDetails } = useContext(AuthContext);
  if (userDetails?.userEmail !== "admin@yahoo.com") return <AdminAuthGuard />;
  return <HotelsTable />;
};

export default HotelsManagement;
