import { Distances, HomeEvents, SearchCategory, SearchDay } from "@/utils/Constant";
import CustomHomeSelect from "../Home/CustomHomeSelect";

const SearchFilter = () => {
  return (
    <section className="flex gap-4 my-10">
      <CustomHomeSelect selectOptions={HomeEvents} selectType={"type"} />
      <CustomHomeSelect selectOptions={Distances} selectType={"distance"} />
      <CustomHomeSelect selectOptions={SearchDay} selectType={"day"} />
      <CustomHomeSelect selectOptions={SearchCategory} selectType={"category"} />
    </section>
  );
};

export default SearchFilter;
