import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export const ProtectedRoutes = ({ children, user }) => {
  if (user) {
    return <Navigate to="/home" />;
  }
  return children ? children : <Outlet />;
};
