import { FC } from "react";
import { InputProps } from "@/Types";
import { TextField, TextFieldProps } from "@mui/material";
import { useSearchLocation } from "./useSearchLocation";
import LocationDropdown from "../LocationDropdown";

const SearchLocation: FC<InputProps & TextFieldProps & {setValue:Function}> = ({
  register,
  label,
  errors,
  setValue,
  id,
}) => {
  const {
    locationInput,
    placePredictions,
    isPlacePredictionsLoading,
    handleLocationSelect,
    showLocationDropdown,
    onChangeHandler,
  } = useSearchLocation(setValue, id);

  return (
    <div className="relative">
      <TextField
        variant="outlined"
        color="primary"
        value={locationInput}
        label={label}
        {...register(id, {
          value: locationInput,
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
          addressType="fullAddress"
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
