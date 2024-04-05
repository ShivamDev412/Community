import { RootState } from "@/redux/RootReducer";
import { useSelector } from "react-redux";

export const useHome = () => {
  const { name } = useSelector((state: RootState) => state.user);
  return { name };
};
