import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/Auth/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }}></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
