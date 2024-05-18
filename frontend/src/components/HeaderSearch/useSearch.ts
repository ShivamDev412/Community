import { setLocation } from "@/redux/slice/homeSlice";
import { setSearch } from "@/redux/slice/searchSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/Store";
import { useGooglePlaces } from "@/Hooks/useGooglePlaces";
import Toast from "@/utils/Toast";
import { RouteEndpoints } from "@/utils/Endpoints";
import { handleLocation } from "@/utils/CommonFunctions/handleLocation";
import { setLoading } from "@/redux/slice/loadingSlice";
import { useGetCityMutation } from "@/redux/slice/api/homeSlice";

export const useSearch = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [place, setPlace] = useState("");
  const dispatch = useDispatch();
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const [isLeftInputFocused, setIsLeftInputFocused] = useState(false);
  const [isRightInputFocused, setIsRightInputFocused] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { location } = useSelector((state: RootState) => state.home);
  const { search } = useSelector((state: RootState) => state.search);
  const [getCity] = useGetCityMutation();
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGooglePlaces();

  //* Use effect for handling focus and blur events on input fields
  useEffect(() => {
    dispatch(setSearch({ ...search, keyword: event }));
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

  useEffect(() => {
    if (location?.city && location?.state) {
      if (!place.includes(location.city) && !place.includes(location.state)) {
        handleSetPlace(location?.city, location?.state);
      }
    }
  }, [location]);
  //* Fetch city based on coordinates on page load
  useEffect(() => {
    //* Get the coordinates of the user
    if (!location?.city && !location?.state) fetchCoordinates();
  }, []);
  const handleSetPlace = (city: string, state: string) => {
    setPlace(`${city}, ${state}`);
  };
  //* Fetch city api call
  const fetchCity = async (lat: number, lon: number) => {
    dispatch(setLoading(true));
    try {
      const response = await getCity({
        lat,
        lon,
      }).unwrap();
      if (response) {
        dispatch(
          setLocation({
            location: {
              city: response.city,
              state: response.state,
            },
          })
        );
      }
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      Toast(error.message, "error");
    }
  };

  const fetchCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(
            setSearch({
              ...search,
              lat: latitude,
              lon: longitude,
            })
          );
          fetchCity(latitude, longitude);
        },
        () => Toast("Unable to retrieve your location", "error")
      );
    } else {
      Toast("Geolocation not supported", "error");
    }
  };

  const handleLocationSelect = (paceId: String, place: string) => {
    console.log(paceId);
    placesService?.getDetails(
      {
        placeId: place,
        fields: ["address_components", "geometry"],
      },
      (placeDetails: any) => {
        const locationData = handleLocation(placeDetails.address_components);
        const latitude = placeDetails.geometry.location.lat();
        const longitude = placeDetails.geometry.location.lng();
        dispatch(setSearch({ ...search, lat: latitude, lon: longitude }));
        if (locationData.location.city && locationData.location.state) {
          dispatch(setLocation(locationData));
          handleSetPlace(
            locationData.location.city,
            locationData.location.state
          );
          placePredictions.length = 0;
          setShowLocationDropdown(false);
        }
      }
    );
  };

  const handleLocationInputClick = () => {
    if (!placePredictions.length) setPlace("");
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
    if (!showLocationDropdown && placePredictions.length) {
      setShowLocationDropdown(true);
    } else setShowLocationDropdown(false);
  };

  const handleLocationBlur = () => {
    if (!placePredictions.length) {
      handleSetPlace(location?.city, location?.state);
    }
  };
  const handleSetEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setSearch({
        ...search,
        keyword: e.target.value,
      })
    );
    setEvent(e.target.value);
  };

  const handleSearch = async () => {
    navigate(RouteEndpoints.SEARCH);
  };
  return {
    event,
    ref1,
    ref2,
    place,
    handleSearch,
    handleSetEvent,
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
