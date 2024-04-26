import { RootState } from "@/redux/RootReducer";
import { setLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { setUser } from "@/redux/slice/userSlice";
export const useHome = () => {
  const dispatch = useDispatch();
  const { axiosPrivate } = useAxiosPrivate();
  const { name } = useSelector((state: RootState) => state.user);
  const getUserDetails = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosPrivate.get(`${API_ENDPOINTS.USER}/`);

      if (response.data.success) {
        dispatch(setLoading(false));
        dispatch(
          setUser({
            ...response.data.data,
            interests: response.data.data.interests.map(
              (interest: any) => interest.interest
            ),
          })
        );
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
