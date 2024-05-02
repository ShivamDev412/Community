import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/RootReducer";
import { setLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { setRsvpEvents } from "@/redux/slice/homeSlice";

export const useYourNextEvents = () => {
  const dispatch = useDispatch();
  const { rsvpEvents } = useSelector((state: RootState) => state.home);
  const { axiosPrivate } = useAxiosPrivate();
  const getRSVPEvents = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosPrivate.get(
        `${API_ENDPOINTS.HOME}${Endpoints.RSVP_EVENTS}`
      );
      if (response.data.success) {
        dispatch(setRsvpEvents(response.data.data));
      }
      dispatch(setLoading(false));
    } catch (err: any) {
      dispatch(setLoading(false));
      Toast(err.message, "error");
    }
  };
  useEffect(() => {
    getRSVPEvents();
  }, []);
  return { rsvpEvents };
};
