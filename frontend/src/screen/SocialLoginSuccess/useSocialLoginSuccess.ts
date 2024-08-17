import { setCredentials } from "@/redux/slice/authSlice";
import { RouteEndpoints } from "@/utils/Endpoints";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const useSocialLoginSuccess = () => {
  const location = useLocation();
  const token = location.search.split("=")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(setCredentials(token));
      navigate(RouteEndpoints.HOME);
    }
  }, [token]);
  return {}
};
