import { CustomHomeSelectType } from "@/Types";
import { RootState } from "@/redux/Store";
import { setFilters } from "@/redux/slice/homeSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export const useCustomHomeSelect = (
  selectOptions: Array<CustomHomeSelectType>,
  selectType: string
) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.home);
  const [options, setOptions] = useState(selectOptions);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(
      selectType === "type"
        ? filters?.type?.value !== "" && filters?.type?.active
        : filters?.distance?.value !== "" && filters?.distance?.active
    );
  }, [selectType, filters]);

  const handleSelect = (value: string) => {
    const updatedOption = options?.map((item) => ({
      ...item,
      active: item?.value === value && value !== "",
    }));
    setOptions(updatedOption);
    const selectedOption = updatedOption?.find((item) => item?.value === value);
    dispatch(setFilters({ ...filters, [selectType]: selectedOption }));
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
