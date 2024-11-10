import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../types/types";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresAuth,
}) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
