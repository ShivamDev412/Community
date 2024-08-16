import { RootState } from "@/redux/Store";
import { useEventsQuery } from "@/redux/slice/api/homeSlice";
import { useSelector } from "react-redux";
export const useHomeEvents = () => {
  const { filters } = useSelector((state: RootState) => state.home) || {};
  const { lat, lon } = useSelector((state: RootState) => state.search) || {};
  const getQuery = () => {
    let que = `?`;
    if (filters?.type.value.trim() !== "") {
      que += `type=${filters?.type.value}&`;
    }
    if (filters?.distance.value.trim() !== "") {
      que += `radius=${filters?.distance.value}&latitude=${lat}&longitude=${lon}`;
    }

    if (que.endsWith("&")) {
      que = que.slice(0, -1);
    }

    return que;
  };
  const { data: events } = useEventsQuery(getQuery(), {
    refetchOnMountOrArgChange: true,
  });
  return { events };
};
