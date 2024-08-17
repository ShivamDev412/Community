import { RootState } from "@/redux/RootReducer";
import { changeTab } from "@/redux/slice/searchSlice";
import { useSelector, useDispatch } from "react-redux";

const SelectionTab = () => {
  const { tab } = useSelector((state: RootState) => state.search);
  return (
    <section className="flex gap-5 items-center">
      <Tab tabName="Events" isActive={tab === "events"} />
      <Tab tabName="Groups" isActive={tab === "groups"} />
    </section>
  );
};
const Tab = ({ tabName, isActive }: { tabName: string; isActive: boolean }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={`flex items-center gap-2 text-2xl font-semibold ${
        isActive &&
        "underline decoration-cyan-700 decoration-4 underline-offset-8 text-cyan-700"
      }`}
      onClick={() => dispatch(changeTab(tabName.toLowerCase()))}
    >
      {tabName}
    </button>
  );
};
export default SelectionTab;
