import {
  Distances,
  HomeEvents,
  SearchCategory,
  SearchDay,
} from "@/utils/Constant";
import CustomHomeSelect from "../Home/CustomHomeSelect";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/RootReducer";

const SearchFilter = () => {
  const { tab } = useSelector((state: RootState) => state.search);
  return (
    <section className="flex gap-4 my-10">
      {tab === "events" ? (
        <>
          <CustomHomeSelect selectOptions={HomeEvents} selectType={"type"} />
          <CustomHomeSelect selectOptions={Distances} selectType={"distance"} />
          <CustomHomeSelect selectOptions={SearchDay} selectType={"day"} />
          <CustomHomeSelect
            selectOptions={SearchCategory}
            selectType={"category"}
          />
        </>
      ) : (
        <>
          <CustomHomeSelect selectOptions={Distances} selectType={"distance"} />
        </>
      )}
    </section>
  );
};

export default SearchFilter;
