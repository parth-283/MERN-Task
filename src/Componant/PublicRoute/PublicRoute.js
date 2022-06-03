import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let token = localStorage.getItem("login-token");
  return token;
};

const PublicRoute = () => {
  const isauth = useAuth();
  return isauth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
