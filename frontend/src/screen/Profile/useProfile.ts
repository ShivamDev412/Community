import { RootState } from "@/redux/RootReducer";
import { useSelector } from "react-redux";
import moment from "moment";
export const useProfile = () => {
  const { image, name, location, email, joined_on, compressedImage } = useSelector(
    (state: RootState) => state.user
  );
  const joined_on_date = moment(joined_on).format("MMM DD, YYYY");
  return {
    image,
    name,
    compressedImage,
    location,
    email,
    joined_on_date,
  };
};
