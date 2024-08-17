import { RootState } from "@/redux/RootReducer";
import { useSelector } from "react-redux";

import { useEventsInGroupQuery } from "@/redux/slice/api/groupsSlice";

export const useGroupEvents = () => {
  const { groupEvents, groupDetails } = useSelector(
    (state: RootState) => state.groups
  );
  const { data: eventsInGroup } = useEventsInGroupQuery(groupDetails.id);

  return {
    groupEvents,
    eventsInGroup,
  };
};
