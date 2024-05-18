import moment from "moment";
import { useUserQuery } from "@/redux/slice/api/userSlice";
export const useProfile = () => {
  const {data:user} = useUserQuery("");
  const joined_on_date = moment(user?.data?.joined_on).format("MMM DD, YYYY");
  return {
    user,
    joined_on_date,
  };
};
