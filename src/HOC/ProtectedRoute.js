import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
