import { CustomHomeSelectType } from "@/Types";
import { RootState } from "@/redux/Store";
import { setFilters } from "@/redux/slice/homeSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export const useCustomHomeSelect = (
  selectOptions: Array<CustomHomeSelectType>
) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.home);
  const [options, setOptions] = useState(selectOptions);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (selectOptions.length === 3) {
      setIsActive(filters.type.value !== "" ? filters.type.active : false);
    } else {
      setIsActive(
        filters.distance.value !== "" ? filters.distance.active : false
      );
    }
  }, [options, filters]);
  const handleSelect = (value: string) => {
    const updatedOption = options.map((item) => ({
      ...item,
      active: item.value === value && value !== "",
    }));
    setOptions(updatedOption);
    const selectedOption = updatedOption.find((item) => item.value === value);
    console.log(selectedOption);
    const filterType = selectOptions.length === 3 ? "type" : "distance";
    dispatch(setFilters({ ...filters, [filterType]: selectedOption }));
    setShowDropDown(false);
  };
  return {
    options,
    handleSelect,
    filters,
    showDropDown,
    setShowDropDown,
    isActive,
  };
};
