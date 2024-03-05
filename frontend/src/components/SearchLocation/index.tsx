import { FC } from "react";
import { InputProps } from "@/Types";
import { TextField, TextFieldProps } from "@mui/material";
import { useSearchLocation } from "./useSearchLocation";
import LocationDropdown from "../LocationDropdown";
import { useLocation } from "react-router-dom";

const SearchLocation: FC<
  InputProps & TextFieldProps & { setValue: Function;}
> = ({ register, label, errors, setValue, id }) => {
  const {
    // locationInput,
    placePredictions,
    isPlacePredictionsLoading,
    handleLocationSelect,
    showLocationDropdown,
    onChangeHandler,
  } = useSearchLocation(setValue, id);
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  return (
    <div className="relative w-full">
      <TextField
        variant="outlined"
        color="primary"
        label={label}
        {...register(id, {
          // value: locationInput,
          onChange: onChangeHandler,
        })}
        // onChange={onChangeHandler}
        className="w-full"
      />
      {showLocationDropdown && (
        <LocationDropdown
          placePredictions={placePredictions}
          isPlacePredictionsLoading={isPlacePredictionsLoading}
          handleLocationSelect={handleLocationSelect}
          className="top-[3.5rem]"
          addressType={path === "edit-profile" ? "city" : "fullAddress"}
        />
      )}
      {errors[id] && (
        <p className="text-red-700 my-2">
          {typeof errors[id] === "string" ? errors[id] : errors[id].message}
        </p>
      )}
    </div>
  );
};

export default SearchLocation;
