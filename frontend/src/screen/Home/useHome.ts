import { RootState } from "@/redux/RootReducer";
import { setLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { setUser } from "@/redux/slice/userSlice";
import { resetFilters, setEvents } from "@/redux/slice/homeSlice";
export const useHome = () => {
  const dispatch = useDispatch();
  const { axiosPrivate } = useAxiosPrivate();
  const { name } = useSelector((state: RootState) => state.user);
  const { coord } = useSelector((state: RootState) => state.home);
  const [radius, setRadius] = useState(30);
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
    const que = `?radius=${radius}&latitude=${coord.lat}&longitude=${coord.lon}`;
    if (query) {
      return `${que}&query=${query}`;
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
  }, [coord]);
  const handleResetFilter = () => {
    dispatch(resetFilters())
  }
  return { name, radius, setRadius, handleResetFilter };
};
