import { RootState } from "@/redux/RootReducer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUserEventsQuery } from "@/redux/slice/api/eventsSlice";
const useEventTab = () => {
  const { hostingPageNumber, attendingPageNumber, pastPageNumber } =
    useSelector((state: RootState) => state.events);
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("attending");
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
  const { data: userEvents } = useUserEventsQuery(`?tab=${tab}&page=${page}`);

  return {
    userEvents,
    value,
    handleChange,
    handlePageChange,
  };
};
export default useEventTab;
