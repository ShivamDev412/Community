import { EventDetailType } from "@/Types";
import { getApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import Toast from "@/utils/Toast";
export const useEventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventDetailType>({} as EventDetailType);
  const getEventDetails = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getApi(
        `${API_ENDPOINTS.USER}${Endpoints.USER_EVENTS_DETAILS}/${eventId}`
      );
      if (res.success) {
        setEvent(res.data);
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
    event,
  };
};
