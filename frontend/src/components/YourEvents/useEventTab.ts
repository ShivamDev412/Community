import { RootState } from "@/redux/RootReducer";
import { setLoading } from "@/redux/slice/loadingSlice";
import {
  setAttendingEvents,
  setHostingEvents,
  setPastEvents,
} from "@/redux/slice/eventSlice";
import { getApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const useEventTab = () => {
  const dispatch = useDispatch();
  const {
    hostingEvents,
    attendingEvents,
    pastEvents,
    hostingPageNumber,
    attendingPageNumber,
    pastPageNumber,
  } = useSelector((state: RootState) => state.events);
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("attending");
  useEffect(() => {
    getEvents();
  }, [tab]);
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    switch (newValue) {
      case "1":
        setTab("attending");
        break;
      case "2":
        setTab("hosting");
        break;
      case "3":
        setTab("past");
        break;
    }
  };
  const handlePageChange = () => {
    switch (tab) {
      case "attending":
        setPage(attendingPageNumber);
        break;
      case "hosting":
        setPage(hostingPageNumber);
        break;
      case "past":
        setPage(pastPageNumber);
        break;
    }
  };
  const getEvents = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getApi(
        `${API_ENDPOINTS.USER}${Endpoints.USER_EVENTS}?tab=${tab}&page=${page}`
      );
      if (res.success) {
        switch (tab) {
          case "attending":
            dispatch(setAttendingEvents(res?.data));
            break;
          case "hosting":
            dispatch(setHostingEvents(res?.data));
            break;
          case "past":
            dispatch(setPastEvents(res?.data));
            break;
        }
        dispatch(setLoading(false));
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      Toast(error.message, "error");
    }
  };

  return {
    value,
    handleChange,
    handlePageChange,
    hostingEvents,
    attendingEvents,
    pastEvents,
  };
};
export default useEventTab;
