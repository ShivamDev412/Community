import { useEffect } from "react";
import axios, { axiosPrivate, axiosPrivateFile } from "@/utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { setCredentials } from "@/redux/slice/authSlice";
import Toast from "@/utils/Toast";
const refreshToken = async () => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.AUTH}${Endpoints.REFRESH_TOKEN}`
    );
    const token = response.data["auth-token"];
    return token;
  } catch (err: any) {
    console.log(err);
    Toast(err.message, "error");
  }
};
const useAxiosPrivate = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest?.sent) {
          originalRequest.sent = true;
          const newAccessToken = await refreshToken();
          if (!newAccessToken) return Promise.reject(error);
          else {
            dispatch(setCredentials(newAccessToken));
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosPrivate(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
    const requestInterceptorFile = axiosPrivateFile.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptorFile = axiosPrivateFile.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest?.sent) {
          originalRequest.sent = true;
          const newAccessToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateFile(originalRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivateFile.interceptors.response.eject(responseInterceptorFile);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivateFile.interceptors.request.eject(requestInterceptorFile);
    };
  }, [token, refreshToken]);

  return {
    axiosPrivate,
    axiosPrivateFile,
  };
};
export default useAxiosPrivate;
