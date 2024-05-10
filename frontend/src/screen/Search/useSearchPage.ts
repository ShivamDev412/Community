import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { SearchType } from "@/Types";
import { RootState } from "@/redux/Store";
import { setEvents } from "@/redux/slice/searchSlice";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useSearchPage = () => {
  const dispatch = useDispatch();
  const { axiosPrivate } = useAxiosPrivate();
  const { search, events, groups } = useSelector(
    (state: RootState) => state.search
  );
  const generateSearchQuery = () => {
    const queryParams: string[] = [];

    for (const key in search) {
      if (Object.prototype.hasOwnProperty.call(search, key)) {
        const value = search[key as keyof SearchType];
        if (typeof value === "object" && value !== null) {
          if (value.value !== "")
            queryParams.push(`${key}=${encodeURIComponent(value.value)}`);
        }
        if (typeof value === "string" || typeof value === "number") {
          if (value !== "" && value !== 0)
            queryParams.push(`${key}=${encodeURIComponent(value)}`);
        }
      }
    }

    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  const handleSearch = async () => {
    try {
      const response = await axiosPrivate.get(
        `${API_ENDPOINTS.HOME}${
          Endpoints.SEARCH_EVENTS
        }${generateSearchQuery()}`
      );
      if (response.data.success) {
        dispatch(setEvents(response.data.data));
      }
    } catch (error) {
      Toast("Something went wrong", "error");
    }
  };
  return {
    search,
    events,
    groups,
  };
};
