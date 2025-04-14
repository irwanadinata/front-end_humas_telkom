import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/utils/context/auth-context";
import NotFound from "@/pages/404/index"

const ProtectedRoute = ({ children, roleAllowed }) => {
  const { token } = useAuth();

  if (!token) {
    // Tidak ada token, redirect ke halaman utama
    return <Navigate to="/" />;
  }

  let user;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    user = payload;
  } catch (error) {
    // Token invalid
    return <Navigate to="/" />;
  }

  if (roleAllowed && user.role !== roleAllowed) {
    // Role tidak sesuai
    return <NotFound/>;
  }

  return children;
};

export default ProtectedRoute;
