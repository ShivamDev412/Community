import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import Toast from "@/utils/Toast";
import { setEventDetails } from "@/redux/slice/eventSlice";
import { RootState } from "@/redux/RootReducer";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
export const useEventDetails = () => {
  const [isAttending, setIsAttending] = useState(false);
  const { axiosPrivate } = useAxiosPrivate();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { eventDetails } = useSelector((state: RootState) => state.events);
  const { id } = useSelector((state: RootState) => state.user);

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
  const attendEvent = async () => {
    try {
      const res = await axiosPrivate.post(
        `${API_ENDPOINTS.USER}${Endpoints.REGISTER_TO_EVENT}`,
        {
          eventId,
        }
      );
      if (res.data.success) {
        getEventDetails()
        setIsAttending(true);
        Toast(res.data.message, "success");
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const isUserAttending = () => {
    return eventDetails.members.some((attendee) => attendee.id === id);
  }
  const cancelRSVP = async () => {
    try {
      const res = await axiosPrivate.post(
        `${API_ENDPOINTS.USER}${Endpoints.CANCEL_RSVP}`,
        {
          eventId,
        }
      );
      if (res.data.success) {
        getEventDetails()
        setIsAttending(false);
        Toast(res.data.message, "success");
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  useEffect(() => {
    getEventDetails();
  }, [eventId]);
  useEffect(() => {
    setIsAttending(isUserAttending());
  }, [eventDetails]);
  return {
    eventDetails,
    id,
    attendEvent,
    isUserAttending,
    isAttending,
    cancelRSVP,
  };
};
