import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import Toast from "@/utils/Toast";
import { setEventDetails } from "@/redux/slice/eventSlice";
import { RootState } from "@/redux/RootReducer";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
export const useEventDetails = () => {
  const {axiosPrivate} = useAxiosPrivate()
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { eventDetails} = useSelector((state: RootState) => state.events);
  const {id} = useSelector((state: RootState) => state.user);
  const getEventDetails = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosPrivate.get(
        `${API_ENDPOINTS.EVENT}${Endpoints.EVENTS_DETAILS}/${eventId}`
      );
      if (res.data.success) {
        dispatch(setEventDetails(res.data.data));
        dispatch(setLoading(false));
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const attendEvent = async (id:string) => {

  }
  useEffect(() => {
    getEventDetails();
  }, [eventId]);
  return {
    eventDetails,
    id,
    attendEvent
  };
};
