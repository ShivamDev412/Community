import { useDispatch } from "react-redux";
import Toast from "@/utils/Toast";
import { RouteEndpoints } from "@/utils/Endpoints";
import { useNavigate } from "react-router-dom";

import { logOut } from "@/redux/slice/authSlice";
import { useLogOutMutation } from "@/redux/slice/api/userSlice";

export const useHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogOutMutation();
  const logoutHandler = async () => {
    const response = await logout().unwrap();
    try {
      if (response.success) {
        navigate(RouteEndpoints.LOGIN);
        Toast(response.message, "success");
        dispatch(logOut());
     
      }
    } catch (error) {
      Toast("Something went wrong", "error");
    }
  };

  return {
    logoutHandler,
  };
};
