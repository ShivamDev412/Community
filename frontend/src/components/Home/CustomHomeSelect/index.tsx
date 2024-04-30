import { FC } from "react";
import { useCustomHomeSelect } from "./useCustomHomeSelect";
import { IoIosArrowUp } from "react-icons/io";
import { CustomHomeSelectType } from "@/Types";

const CustomHomeSelect: FC<{
  selectOptions: CustomHomeSelectType[];
  selectType: string;
}> = ({ selectOptions, selectType }) => {
  const {
    options,
    handleSelect,
    filters,
    showDropDown,
    setShowDropDown,
    isActive,
  } = useCustomHomeSelect(selectOptions, selectType);
  return (
    <div className="relative w-[9rem]">
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        className={`${
          isActive ? "bg-cyan-700 text-white" : "bg-stone-100 text-black"
        } whitespace-nowrap px-4 py-2 rounded-[25px] font-[550] z-1 flex items-center gap-2 hover:cursor-pointer shadow-sm text-sm w-full justify-between`}
      >
        {selectType === "type"
          ? filters?.type?.label
          : filters?.distance?.label}
        <IoIosArrowUp
          className={`${
            showDropDown ? "rotate-180" : "rotate-0"
          } transition-all h-5 w-5`}
        />
      </button>
      {showDropDown && (
        <div className="absolute top-10 left-0 flex flex-col border shadow-md items-start gap-2  bg-white w-full">
          {options?.map((item) => (
            <button
              key={item?.value}
              onClick={() => handleSelect(item?.value)}
              className="text-gray-600 hover:bg-stone-100 hover:cursor-pointer w-full px-2 py-1.5 text-sm whitespace-nowrap"
            >
              {item?.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomHomeSelect;
