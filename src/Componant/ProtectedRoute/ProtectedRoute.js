import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  let token = localStorage.getItem("login-token");
  return token;
};

const ProtectedRoute = () => {
  const isauth = useAuth();
  return isauth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
