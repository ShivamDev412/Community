import { useDispatch } from "react-redux";
import Toast from "@/utils/Toast";
import { clearUser } from "@/redux/slice/userSlice";
import { RouteEndpoints } from "@/utils/Endpoints";
import { useNavigate } from "react-router-dom";
import { clearGroups } from "@/redux/slice/groupSlice";

import { logOut } from "@/redux/slice/authSlice";
import { clearAllEvents } from "@/redux/slice/eventSlice";
import { clearHomeState } from "@/redux/slice/homeSlice";
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
        //* Clear all the data from redux store
        dispatch(logOut());
        dispatch(clearAllEvents());
        dispatch(clearUser());
        dispatch(clearGroups());
        dispatch(clearHomeState());
      }
    } catch (error) {
      Toast("Something went wrong", "error");
    }
  };

  return {
    logoutHandler,
  };
};
