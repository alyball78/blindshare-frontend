import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "../utils/jwt.utils";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  if (!isAuthenticated || !isTokenValid(token)) {
    logout();
    return <Navigate to="/login" />;
  }
  if (role) {
    const { role: userRole } = jwtDecode(token);
    if (userRole !== role) {
      return <Navigate to="/" />;
    }
  }
  return children;
}
