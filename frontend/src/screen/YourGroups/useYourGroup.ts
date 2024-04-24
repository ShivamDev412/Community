import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { RootState } from "@/redux/RootReducer";
import { setGroupsCreated } from "@/redux/slice/groupSlice";
import { setLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useYourGroup = () => {
  const {
    groupsCreated,
    groupsInMember,
    pageNumberCreated,
    pageNumberInMember,
  } = useSelector((state: RootState) => state.groups);

  const dispatch = useDispatch();
  const { axiosPrivate } = useAxiosPrivate();
  useEffect(() => {
    getGroupsAsOrganizer();
  }, []);
  const getGroupsAsOrganizer = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosPrivate.get(
        `${API_ENDPOINTS.USER}${Endpoints.GET_USER_GROUPS_ORGANIZER}?page=${pageNumberCreated}`
      );
      if (response.data.success) {
        dispatch(setLoading(false));
        dispatch(setGroupsCreated(response.data.data));
      }
    } catch (error: any) {
      dispatch(setLoading(false));

      Toast(error.message, "error");
    }
  };
  return {
    groupsCreated,
    groupsInMember,
    pageNumberCreated,
    pageNumberInMember,
  };
};
