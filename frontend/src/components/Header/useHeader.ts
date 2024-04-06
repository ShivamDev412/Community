import { setCoord, setLocation } from "@/redux/slice/homeSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";
import { useGooglePlaces } from "@/Hooks/useGooglePlaces";
import Cookies from "js-cookie";
import Toast from "@/utils/Toast";
import { clearUser } from "@/redux/slice/userSlice";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import { useNavigate } from "react-router-dom";
import { clearGroups } from "@/redux/slice/groupSlice";
import axios from "axios";
import { getApi } from "@/utils/Api";
import { handleLocation } from "@/utils/CommonFunctions/handleLocation";
import { setLoading } from "@/redux/slice/loadingSlice";

export const useHeader = () => {
  // const [coord, setCoord] = useState({
  //   lat: 0,
  //   lon: 0,
  // });
  const [event, setEvent] = useState("");
  const [place, setPlace] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const [isLeftInputFocused, setIsLeftInputFocused] = useState(false);
  const [isRightInputFocused, setIsRightInputFocused] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { location, coord } = useSelector((state: RootState) => state.home);

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGooglePlaces();
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
      handleSetPlace(location?.city, location?.state);
    }
  }, [location]);
  const fetchCity = async () => {
    try {
      // dispatch(setLoading(true));
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          coord.lat
        },${coord.lon}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_ID!}`
      );
      const data = response.data;
      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        dispatch(setLocation(handleLocation(addressComponents)));
      }
      dispatch(setLoading(false));
    } catch (error:any) {
      dispatch(setLoading(false));
      Toast(error.message, "error");
      throw error;
    }
  };
  useEffect(() => {
    if (!location.city && !location.state) {
      if (coord.lat && coord.lon) {
       
        fetchCity();
      }
    }
  }, [coord]);

  useEffect(() => {
    const fetchCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            dispatch(setCoord({ lat: latitude, lon: longitude }));
          },
          () => console.log("Unable to retrieve your location")
        );
      } else {
        console.log("Geolocation not supported");
      }
    };

    fetchCoordinates();

    return () => {};
  }, [dispatch]);
  const handleSetPlace = (city: string, state: string) => {
    setPlace(`${city}, ${state}`);
  };
// 
  const handleLocationSelect = (paceId:String, place: string) => {
    console.log(paceId);
    placesService?.getDetails(
      {
        placeId: place,
        fields: ["address_components"],
      },
      (placeDetails: any) => {
        
        const locationData = handleLocation(placeDetails.address_components);
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

  const logout = () => {
    Cookies.remove("community-auth-token");
    Toast("Logged out successfully", "success");
    navigate(RouteEndpoints.LOGIN);
    dispatch(clearUser());
    dispatch(clearGroups());
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
      const res = await getApi(
        `${API_ENDPOINTS.HOME}${Endpoints.SEARCH}?${query}`
      );
      console.log(res);
    } catch (error) {
      Toast("Something went wrong", "error");
    }
  };
  return {
    event,
    ref1,
    ref2,
    place,
    logout,
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
