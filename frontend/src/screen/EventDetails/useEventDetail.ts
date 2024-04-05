import { getApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import Toast from "@/utils/Toast";
import { setEventDetails } from "@/redux/slice/eventSlice";
import { RootState } from "@/redux/RootReducer";
export const useEventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { eventDetails} = useSelector((state: RootState) => state.events);
  const getEventDetails = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getApi(
        `${API_ENDPOINTS.EVENT}${Endpoints.EVENTS_DETAILS}/${eventId}`
      );
      if (res.success) {
        dispatch(setEventDetails(res.data));
        dispatch(setLoading(false));
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  useEffect(() => {
    getEventDetails();
  }, [eventId]);
  return {
    eventDetails,
  };
};
