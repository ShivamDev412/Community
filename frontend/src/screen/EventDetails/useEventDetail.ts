import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/utils/Toast";
import { setEventDetails } from "@/redux/slice/eventSlice";
import { RootState } from "@/redux/RootReducer";
import { useEventDetailsQuery } from "@/redux/slice/api/eventsSlice";
import {
  useCancelEventRSVPMutation,
  useRegisterToEventMutation,
  useUserQuery,
} from "@/redux/slice/api/userSlice";
export const useEventDetails = () => {
  const [isAttending, setIsAttending] = useState(false);
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { eventDetails } = useSelector((state: RootState) => state.events);
  const { data: user } = useUserQuery("");
  const { data: eventData } = useEventDetailsQuery(eventId as string);
  const [cancelEvent] = useCancelEventRSVPMutation();
  const [registerToEvent] = useRegisterToEventMutation();
  const attendEvent = async () => {
    try {
      const res = await registerToEvent(eventId as string).unwrap();
      if (res.success) {
        // getEventDetails()
        setIsAttending(true);
        Toast(res.message, "success");
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const isUserAttending = () => {
    return eventDetails.members.some(
      (attendee) => attendee.id === user?.data?.id
    );
  };
  const cancelRSVP = async () => {
    try {
      const res = await cancelEvent(eventId as string).unwrap();
      if (res.success) {
        // getEventDetails()
        setIsAttending(false);
        Toast(res.message, "success");
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  useEffect(() => {
    if (eventData) {
      dispatch(setEventDetails(eventData.data));
    }
  }, [eventId, eventData]);
  useEffect(() => {
    setIsAttending(isUserAttending());
  }, [eventDetails]);
  return {
    eventDetails,
    id: user?.data?.id,
    attendEvent,
    isUserAttending,
    isAttending,
    cancelRSVP,
  };
};
