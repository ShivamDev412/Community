import { setSkeletonLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/utils/Toast";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { RootState } from "@/redux/RootReducer";
import { setGroupDetails } from "@/redux/slice/groupSlice";

export const useGroupDetails = () => {
  const {axiosPrivate} = useAxiosPrivate()
  const { groupDetails } = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const location = useLocation();
  const groupName = location.pathname.split("/")[2];
  const getGroupDetails = async () => {
    try {
      dispatch(setSkeletonLoading(true));
      const res = await axiosPrivate.get(
        `${API_ENDPOINTS.GROUP}${Endpoints.GROUP_DETAILS}?name=${groupName}`
      );
      if (res.data.success) {
        dispatch(setGroupDetails(res.data.data));
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
