import { useDispatch } from "react-redux";
import Toast from "@/utils/Toast";
import { clearUser } from "@/redux/slice/userSlice";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import { useNavigate } from "react-router-dom";
import { clearGroups } from "@/redux/slice/groupSlice";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";

import { logOut } from "@/redux/slice/authSlice";
import { clearAllEvents } from "@/redux/slice/eventSlice";

export const useHeader = () => {
  const { axiosPrivate } = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response: any = await axiosPrivate.post(
      `${API_ENDPOINTS.USER}${Endpoints.LOGOUT}`
    );
    try {
      if (response.data.success) {
        navigate(RouteEndpoints.LOGIN);
        Toast(response.data.message, "success");
        //* Clear all the data from redux store
        dispatch(logOut());
        dispatch(clearAllEvents());
        dispatch(clearUser());
        dispatch(clearGroups());
      }
    } catch (error) {
      Toast("Something went wrong", "error");
    }
  };

  return {
    logoutHandler,
  };
};
