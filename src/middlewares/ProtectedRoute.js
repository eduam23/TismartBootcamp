import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  return localStorage.token ? children : <Navigate _replace_ to="/login" />;
}