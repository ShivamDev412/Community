import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";
export const useHomeEvents = () => {
  const { events } = useSelector((state: RootState) => state.home);
  return { events };
};
