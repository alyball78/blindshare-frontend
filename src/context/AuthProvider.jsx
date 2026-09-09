import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { isTokenValid } from "../utils/jwt.utils";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  if (storedToken && !isTokenValid(storedToken)) {
    localStorage.removeItem("token");
  }

  const validStoredToken =
    storedToken && isTokenValid(storedToken) ? storedToken : null;

  const [isAuthenticated, setIsAuthenticated] = useState(!!validStoredToken);
  const [role, setRole] = useState(
    validStoredToken ? jwtDecode(validStoredToken).role : null,
  );

  function login(token) {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setRole(jwtDecode(token).role);
    navigate("/");
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
