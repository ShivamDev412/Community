import { resetFilters } from "@/redux/slice/homeSlice";
import { useDispatch } from "react-redux";
export const useHomeFilter = () => {
  const dispatch = useDispatch();
  const handleResetFilter = () => {
    dispatch(resetFilters());
  };
  return { handleResetFilter };
};
