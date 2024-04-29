import { twMerge } from "tailwind-merge";
import { FC } from "react";
import { LocationDropdownProps } from "@/Types";
const LocationDropdown: FC<LocationDropdownProps> = ({
  placePredictions,
  isPlacePredictionsLoading,
  handleLocationSelect,
  className = "",
  addressType = "city",
}) => {
  return (
    <>
      {placePredictions.length !== 0 && isPlacePredictionsLoading === false && (
        <div
          className={twMerge(
            "absolute bg-white z-[999] top-10 left-0 border rounded-lg px-2 py-4 w-full",
            className
          )}
        >
          {placePredictions.map((prediction) => (
            <p
              key={prediction.place_id}
              className="text-black py-2 hover:cursor-pointer hover:bg-slate-100 transition-all p-2 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                handleLocationSelect(
                  prediction.place_id,
                  addressType === "city"
                    ? prediction.place_id
                    : prediction.description,
                    addressType === "city" ? "placedId" : "fullAddress"
                );
              }}
            >
              {prediction.description}
            </p>
          ))}
        </div>
      )}
    </>
  );
};
export default LocationDropdown;
