import { useGooglePlaces } from "@/Hooks/useGooglePlaces";
import { useState } from "react";

export const useSearchLocation = () => {
  const [locationInput, setInputLocation] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGooglePlaces("");
  const handleLocationSelect = (place: string) => {
    setInputLocation(place);
    setShowLocationDropdown(false);
    placePredictions.length = 0;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { value } = e.target;
    if (placePredictions.length) {
      setShowLocationDropdown(true);
    }

    setInputLocation(value);
    getPlacePredictions({ input: value });
  };
  return {
    locationInput,
    placePredictions,
    isPlacePredictionsLoading,
    handleLocationSelect,
    showLocationDropdown,
    onChangeHandler,
  };
};
