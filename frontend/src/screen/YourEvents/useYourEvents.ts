import { setGroupsCreated } from "@/redux/slice/groupSlice";
import { setLoading } from "@/redux/slice/loadingSlice";
import { getApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const useYourEvents = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getGroupsCreatedByYou();
  }, [dispatch]);
  const getGroupsCreatedByYou = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getApi(
        `${API_ENDPOINTS.GROUP}${Endpoints.GROUPS_ORGANIZED_BY_USER}`
      );
      if (res.success) {
        dispatch(setGroupsCreated(res.data));
      }
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
    }
  };
  return {
    navigation,
  };
};
