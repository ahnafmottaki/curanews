import axios from "axios";
import { useAuth } from "../contexts/Auth/AuthContext";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_baseUrl,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user?.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;
