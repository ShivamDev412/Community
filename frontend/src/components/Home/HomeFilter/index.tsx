import CustomHomeSelect from "../CustomHomeSelect";
import { Distances, HomeEvents } from "@/utils/Constant";
import { useHomeFilter } from "./useHomeFilter";

const HomeFilter = () => {
  const { handleResetFilter } = useHomeFilter();
  return (
    <div className="flex gap-10 items-center">
      <CustomHomeSelect selectOptions={HomeEvents} selectType={"type"} />
      <CustomHomeSelect selectOptions={Distances} selectType={"distance"} />
      <button
        className="text-cyan-700 text-sm font-semibold"
        onClick={handleResetFilter}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default HomeFilter;
