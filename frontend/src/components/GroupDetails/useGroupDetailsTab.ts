import { RootState } from "@/redux/RootReducer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const useGroupDetailsTab = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const { groupDetails } = useSelector((state: RootState) => state.groups);
  const getLink = (link: string) => {
    return `/group/${groupDetails?.name}${link}`;
  };
  return { getLink, path };
};
export default useGroupDetailsTab;
