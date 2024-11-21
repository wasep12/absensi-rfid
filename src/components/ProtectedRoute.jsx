import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token di localStorage, arahkan ke halaman login
    return <Navigate to="/" replace />;
  }

  // Jika ada token, izinkan akses ke halaman yang dilindungi
  return children;
};

export default ProtectedRoute;
