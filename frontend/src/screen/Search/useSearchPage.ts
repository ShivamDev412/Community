import { SearchType } from "@/Types";
import { RootState } from "@/redux/Store";
import { useSearchQuery } from "@/redux/slice/api/homeSlice";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useSearchPage = () => {
  const search = useSelector((state: RootState) => state.search) as SearchType;
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isFetching } = useSearchQuery(searchQuery);

  const generateSearchQuery = () => {
    const queryParams: string[] = [];

    Object.entries(search).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (typeof value === "object" && value.value !== "") {
          queryParams.push(`${key}=${encodeURIComponent(value.value)}`);
        } else if (
          (typeof value === "string" && value !== "") ||
          (typeof value === "number" && value !== 0)
        ) {
          queryParams.push(`${key}=${encodeURIComponent(value)}`);
        }
      }
    });

    setSearchQuery(queryParams.length > 0 ? `?${queryParams.join("&")}` : "");
  };

  useEffect(() => {
    generateSearchQuery();
  }, [search]);

  useEffect(() => {
    if (error) {
      Toast("Something went wrong", "error");
    }

    if (search?.tab === "events") {
      // Handle events tab-specific logic here
    }
  }, [data, error]);

  return {
    data: data?.data,
    search,
    isFetching,
  };
};
