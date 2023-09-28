import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../util/utilFunctions";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ Component }) => {
  return getCurrentUser() ? <Component /> : <Navigate to="/signin" />;
};
