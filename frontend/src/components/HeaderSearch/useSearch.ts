import { setCoord, setLocation } from "@/redux/slice/homeSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";
import { useGooglePlaces } from "@/Hooks/useGooglePlaces";
import Toast from "@/utils/Toast";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { handleLocation } from "@/utils/CommonFunctions/handleLocation";
import { setLoading } from "@/redux/slice/loadingSlice";

export const useSearch = () => {
  const [event, setEvent] = useState("");
  const [place, setPlace] = useState("");
  const { axiosPrivate } = useAxiosPrivate();
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

  //* Use effect for handling focus and blur events on input fields
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
      const response = await axiosPrivate.post(
        `${API_ENDPOINTS.HOME}${Endpoints.GET_CITY}`,
        {
          lat,
          lon,
        }
      );

      if (response.statusText === "OK") {
        const data = response.data;
        dispatch(
          setLocation({
            location: {
              city: data.city,
              state: data.state,
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
          dispatch(setCoord({ lat: latitude, lon: longitude }));
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
        dispatch(setCoord({ lat: latitude, lon: longitude }));
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
    setEvent(e.target.value);
  };
  const handleSearch = async () => {
    let query = `city=${location.city}&state=${location.state}`;
    if (event.trim()) {
      query += `&event=${event}`;
    }
    try {
      const res = await axiosPrivate.get(
        `${API_ENDPOINTS.HOME}${Endpoints.SEARCH}?${query}`
      );
      console.log(res)
    } catch (error) {
      Toast("Something went wrong", "error");
    }
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
