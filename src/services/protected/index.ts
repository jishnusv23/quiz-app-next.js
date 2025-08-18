"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated, isAdmin } = useSelector((state: any) => state.user);

  const router = useRouter();
  useEffect(() => {
    if (isAdmin) {
      router.push("/admin");
    } else if (isAuthenticated) {
      router.push("/")
    }
  },[isAdmin,isAuthenticated]);

  return children
};
