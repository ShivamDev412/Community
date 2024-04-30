import { RootState } from "@/redux/RootReducer";
import { setLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { setUser } from "@/redux/slice/userSlice";
import { setEvents } from "@/redux/slice/homeSlice";

export const useHome = () => {
  const dispatch = useDispatch();
  const { axiosPrivate } = useAxiosPrivate();
  const { name } = useSelector((state: RootState) => state.user);
  const { coord, filters } = useSelector((state: RootState) => state.home);

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
  const getQuery = (query: string) => {
    let que = `?`;
    if (filters.type.value.trim() !== "") {
      que += `type=${filters.type.value}&`;
    }
    if (filters.distance.value.trim() !== "") {
      que += `radius=${filters.distance.value}&`;
    }
    if (query.trim() !== "") {
      que += `query=${query}&`;
    }
    que += `latitude=${coord.lat}&longitude=${coord.lon}`;

    if (que.endsWith("&")) {
      que = que.slice(0, -1);
    }

    return que;
  };
  const getEvents = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosPrivate.get(
        `${API_ENDPOINTS.HOME}${Endpoints.GET_EVENTS}${getQuery("")}`
      );
      if (response.data.success) {
        dispatch(setEvents(response.data.data));
      }
      dispatch(setLoading(false));
    } catch (err: any) {
      dispatch(setLoading(false));
      Toast(err.message, "error");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => {
    getEvents();
  }, [coord, filters]);
  return { name };
};
