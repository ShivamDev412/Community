import { setSkeletonLoading } from "@/redux/slice/loadingSlice";
import { getApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/utils/Toast";

import { RootState } from "@/redux/RootReducer";
import { setGroupDetails } from "@/redux/slice/groupSlice";

export const useGroupDetails = () => {
  const { groupDetails } = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const location = useLocation();
  const groupName = location.pathname.split("/")[2];
  const getGroupDetails = async () => {
    try {
      dispatch(setSkeletonLoading(true));
      const res = await getApi(
        `${API_ENDPOINTS.GROUP}${Endpoints.GROUP_DETAILS}?name=${groupName}`
      );
      if (res.success) {
        dispatch(setGroupDetails(res.data));
        dispatch(setSkeletonLoading(false));
      }
    } catch(error:any) {
      dispatch(setSkeletonLoading(false));  
      Toast(error.message, "error");
    
    }
  };
  useEffect(() => {
    getGroupDetails();
  }, []);
  return {
    groupDetails,
    groupName,
  };
};
