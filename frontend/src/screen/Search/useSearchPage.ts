import { SearchType } from "@/Types";
import { RootState } from "@/redux/Store";
import { useLazySearchQuery } from "@/redux/slice/api/homeSlice";
import Toast from "@/utils/Toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useSearchPage = () => {
  const { search, events, groups } = useSelector(
    (state: RootState) => state.search
  );
  const [trigger, { data }] = useLazySearchQuery();
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
   if(search.tab === "events"){
    // !Have to be handled
  } else {

  }
  }, [data]);
  useEffect(() => {
    handleSearch();
  }, [search]);

  console.log(data);
  const handleSearch = async () => {
    try {
      trigger(generateSearchQuery());
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
