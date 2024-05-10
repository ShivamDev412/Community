import { CustomHomeSelectType } from "@/Types";
import { RootState } from "@/redux/Store";
import { setFilters } from "@/redux/slice/homeSlice";
import { setSearch } from "@/redux/slice/searchSlice";
import { RouteEndpoints } from "@/utils/Endpoints";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
export const useCustomHomeSelect = (
  selectOptions: Array<CustomHomeSelectType>,
  selectType: string
) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.home);
  const { search } = useSelector((state: RootState) => state.search);
  const [options, setOptions] = useState(selectOptions);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pathname === RouteEndpoints.SEARCH) {
      setIsActive(
        selectType === "type"
          ? search?.type?.value !== "" && search?.type?.active
          : selectType === "distance"
          ? search?.distance?.value !== "" && search?.distance?.active
          : selectType === "day"
          ? search?.day?.value !== "" && search?.day?.active
          : search?.category?.value !== "" && search?.category?.active
      );
    } else {
      setIsActive(
        selectType === "type"
          ? filters?.type?.value !== "" && filters?.type?.active
          : filters?.distance?.value !== "" && filters?.distance?.active
      );
    }
  }, [selectType, filters, search]);

  const handleSelect = (value: string) => {
    const updatedOption = options?.map((item) => ({
      ...item,
      active: item?.value === value && value !== "",
    }));
    setOptions(updatedOption);
    const selectedOption = updatedOption?.find((item) => item?.value === value);
    if (pathname === RouteEndpoints.SEARCH) {
      dispatch(setSearch({ ...search, [selectType]: selectedOption }));
    } else {
      dispatch(setFilters({ ...filters, [selectType]: selectedOption }));
    }

    setShowDropDown(false);
  };
  const displayValue = () => {
    if (pathname === RouteEndpoints.SEARCH) {
      return selectType === "type"
        ? search?.type?.label
        : selectType === "distance"
        ? search?.distance?.label
        : selectType === "day"
        ? search?.day?.label
        : search?.category?.label;
    } else {
      return selectType === "type"
        ? filters?.type?.label
        : filters?.distance?.label;
    }
  };
  return {
    options,
    handleSelect,
    showDropDown,
    setShowDropDown,
    isActive,
    pathname,
    displayValue,
  };
};
