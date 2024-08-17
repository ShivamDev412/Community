import { useGooglePlaces } from "@/Hooks/useGooglePlaces";
import { handleLocation } from "@/utils/CommonFunctions/handleLocation";
import { useState } from "react";
import { useLocation } from "react-router-dom";
export const useSearchLocation = (setValue: Function, id: String) => {
  const [locationInput, setInputLocation] = useState("");
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGooglePlaces(path === "edit-profile" ? "cities" : "");

  const handleLocationSelect = (placeId:string, place: string, addressType: string) => {
    if (addressType == "placedId") {
      placesService?.getDetails(
        {
          placeId: place,
          fields: ["address_components"],
        },
        (placeDetails: any) => {
          const locationData = handleLocation(placeDetails.address_components);
          if (locationData.location.city && locationData.location.state) {
            setValue(
              id,
              locationData.location.city + ", " + locationData.location.state
            );
            setInputLocation(
              locationData.location.city + ", " + locationData.location.state
            );
          }
        }
      );
    } else {
      setValue(id, place);
      setInputLocation(place);
    }

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
