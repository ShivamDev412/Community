import { useLocation } from "react-router-dom";
import { useGroupDetailsQuery } from "@/redux/slice/api/groupsSlice";
import { useDispatch } from "react-redux";
import { setGroupDetails } from "@/redux/slice/groupSlice";
import { useEffect } from "react";
export const useGroupDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const groupName = location.pathname.split("/")[2];
  const { data: groupDetails } = useGroupDetailsQuery(groupName);
  useEffect(() => {
    dispatch(setGroupDetails(groupDetails?.data));
  }, [groupDetails]);
  return {
    groupDetails,
    groupName,
  };
};
