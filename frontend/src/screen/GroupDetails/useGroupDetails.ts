import { setLoading } from "@/redux/slice/loadingSlice";
import { getApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/utils/Toast";
import { setGroupDetails } from "@/redux/slice/groupSlice";
import { RootState } from "@/redux/RootReducer";
export const useGroupDetails = () => {
  const { groupDetails } = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const location = useLocation();
  const groupName = location.pathname.split("/")[2];
  useEffect(() => {
    getGroupDetails();
  }, []);
  const getGroupDetails = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getApi(
        `${API_ENDPOINTS.GROUP}${Endpoints.GROUP_DETAILS}?name=${groupName}`
      );
      if (res.success) {
        dispatch(setGroupDetails(res.data));
        dispatch(setLoading(false));
      }
    } catch {
      Toast("Something went wrong", "error");
      dispatch(setLoading(false));
    }
  };
  return {
    groupDetails,
    groupName,
  };
};
