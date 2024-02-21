import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";
import { setLocation } from "@/redux/slice/homeSlice";
import { useGooglePlaces } from "@/Hooks/useGooglePlaces";
import { getCity, handleLocation } from "@/utils/CommonFunctions/getCity";
export const useHeader = () => {
  const [place, setPlace] = useState("");
  const dispatch = useDispatch();
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const [isLeftInputFocused, setIsLeftInputFocused] = useState(false);
  const [isRightInputFocused, setIsRightInputFocused] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { location } = useSelector((state: RootState) => state.home);
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGooglePlaces();
  useEffect(() => {
    if (location.city && location.state) {
      handleSetPlace(location.city, location.state);
    }
  }, [location]);
  useEffect(() => {
    const handleLeftInputFocus = () => setIsLeftInputFocused(true);
    const handleRightInputFocus = () => setIsRightInputFocused(true);
    const handleLeftInputBlur = () => setIsLeftInputFocused(false);
    const handleRightInputBlur = () => setIsRightInputFocused(false);

    const leftInput = ref1.current;
    const rightInput = ref2.current;

    leftInput?.addEventListener("focus", handleLeftInputFocus);
    leftInput?.addEventListener("blur", handleLeftInputBlur);
    rightInput?.addEventListener("focus", handleRightInputFocus);
    rightInput?.addEventListener("blur", handleRightInputBlur);

    return () => {
      leftInput?.removeEventListener("focus", handleLeftInputFocus);
      leftInput?.removeEventListener("blur", handleLeftInputBlur);
      rightInput?.removeEventListener("focus", handleRightInputFocus);
      rightInput?.removeEventListener("blur", handleRightInputBlur);
    };
  }, []);
  if (location.city === "" && location.state === "") {
    getCity();
  }
  const handleSetPlace = (city: string, state: string) => {
    setPlace(`${city}, ${state}`);
  };
  const handleLocationSelect = (placeId: string) => {
    placesService?.getDetails(
      {
        placeId: placeId,
        fields: ["address_components"],
      },
      (placeDetails: any) => {
        const locationData = handleLocation(placeDetails.address_components);
        dispatch(setLocation(locationData));
        handleSetPlace(locationData.location.city, locationData.location.state);
        placePredictions.length = 0;
        setShowLocationDropdown(false);
      }
    );
  };
  const handleLocationInputClick = () => {
    setPlace("");
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
    if (!showLocationDropdown && placePredictions.length) {
      setShowLocationDropdown(true);
    } else setShowLocationDropdown(false);
  };
  const handleLocationBlur = () => {
    if (!placePredictions.length) {
      handleSetPlace(location.city, location.state);
    }
  };
  return {
    ref1,
    ref2,
    place,
    setPlace,
    handleLocationInputClick,
    handleLocationChange,
    isLeftInputFocused,
    isRightInputFocused,
    getPlacePredictions,
    placePredictions,
    isPlacePredictionsLoading,
    handleLocationSelect,
    showLocationDropdown,
    handleLocationBlur,
  };
};
