import { setGroupEvents } from "@/redux/slice/groupSlice";
import { API_ENDPOINTS } from "./../../../../backend/src/utils/Endpoints";
import { Endpoints } from "./../../utils/Endpoints";
import { RootState } from "@/redux/RootReducer";
import { getApi } from "@/utils/Api";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "@/utils/Toast";
import { setLoading } from "@/redux/slice/loadingSlice";


export const useGroupEvents = () => {
  const dispatch = useDispatch();

  const { groupEvents, groupDetails } = useSelector(
    (state: RootState) => state.groups
  );
  const getEventsInGroup = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getApi(
        `${API_ENDPOINTS.GROUP}${Endpoints.GET_EVENTS_IN_GROUP}?groupId=${groupDetails.id}`
      );
      if (res.success) {
     
        dispatch(
          setGroupEvents({
            events: res.data,
            pageNumber: 1,
          })
        );
        dispatch(setLoading(false));
      }
    } catch (err: any) {
      Toast(err.message, "error");
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getEventsInGroup();
  }, [dispatch]);
  return {
    groupEvents,
  };
};
