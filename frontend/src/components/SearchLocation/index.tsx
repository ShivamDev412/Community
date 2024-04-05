import { FC, useState } from "react";
import { InputProps } from "@/Types";
import { TextField, TextFieldProps } from "@mui/material";
import { useSearchLocation } from "./useSearchLocation";
import LocationDropdown from "../LocationDropdown";
import { useLocation } from "react-router-dom";

const SearchLocation: FC<
  InputProps & TextFieldProps & { setValue: Function; disabled?: boolean}
> = ({ register, label, errors, setValue, id, getValues, disabled = false }) => {
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
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <div className="relative w-full">
      <TextField
        variant="outlined"
        color="primary"
        InputLabelProps={{ shrink: focused || (!!getValues && !!getValues(id)) }}
        label={label}
        autoComplete="off"
        {...register(id, {
          // value: locationInput,
          onChange: onChangeHandler,
        })}
        // onChange={onChangeHandler}
        className="w-full"
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
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
