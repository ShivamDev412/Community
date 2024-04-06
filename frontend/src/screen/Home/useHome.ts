import { RootState } from "@/redux/RootReducer";
import { setLoading } from "@/redux/slice/loadingSlice";
import { setUser } from "@/redux/slice/userSlice";
import { getApi } from "@/utils/Api";
import { API_ENDPOINTS } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const useHome = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.user);
  const getUserDetails = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getApi(`${API_ENDPOINTS.USER}/`);
      if (response.success) {
        dispatch(
          setUser({
            ...response.data,
            bio: response.data.bio ? response.data.bio : "",
            dob: response.data.dob ? response.data.dob : "",
            life_state: response.data.life_state
              ? response.data.life_state
              : [],
            location: response.data.location ? response.data.location : "",
            looking_for: response.data.looking_for
              ? response.data.looking_for
              : [],
            sex: response.data.sex ? response.data.sex : "",
          })
        );
        dispatch(setLoading(false));
      }
    } catch (err: any) {
      dispatch(setLoading(false));
      Toast(err.message, "error");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return { name };
};
