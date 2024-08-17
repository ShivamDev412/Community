import { RootState } from "@/redux/RootReducer";
import { useGroupsCreatedQuery } from "@/redux/slice/api/groupsSlice";
import { useSelector } from "react-redux";

export const useYourGroup = () => {
  const {
    // groupsCreated,
    // groupsInMember,
    pageNumberCreated,
    pageNumberInMember,
  } = useSelector((state: RootState) => state.groups);
  const { data: groupsCreated } = useGroupsCreatedQuery(`?page=${pageNumberCreated}`);
  return {
    // groupsCreated,
    // groupsInMember,
    pageNumberCreated,
    pageNumberInMember,
    groupsCreated,
  };
};
