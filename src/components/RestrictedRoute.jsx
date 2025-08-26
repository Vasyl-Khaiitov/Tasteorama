import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors.js";

export const RestrictedRoute = ({ component, redirectTo = "/" }) => {
  const isUserLoggedIn = useSelector(selectUser);
  return !isUserLoggedIn ? component : <Navigate to={redirectTo} replace />;
};
