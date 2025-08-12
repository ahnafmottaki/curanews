import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router";
import axiosPublic from "../utils/axiosPublic";
import { useAuth } from "../contexts/Auth/AuthContext";
import Loader from "../components/Loader";
const AdminRoute = ({ children }) => {
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to={"/my-profile"}></Navigate>;
  }
  return children;
};

export default AdminRoute;
