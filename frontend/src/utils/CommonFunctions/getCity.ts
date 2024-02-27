import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setLocation } from "@/redux/slice/homeSlice";

export const getCity = () => {
  const dispatch = useDispatch();
  const [coord, setCoord] = useState({
    lat: 0,
    lon: 0,
  });
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            coord.lat
          },${coord.lon}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_ID!}`
        );
        const data = response.data;

        if (data.status === "OK") {
          const addressComponents = data.results[0].address_components;
          dispatch(setLocation(handleLocation(addressComponents)));
        } else {
          throw new Error(data.error_message || "Failed to fetch city name");
        }
      } catch (error) {
        console.error("Error fetching city name:", error);
        throw error;
      }
    };
    if (coord.lat !== 0 && coord.lon !== 0) fetchCity();
  }, [coord]);
  useEffect(() => {
    const fetchCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoord({ lat: latitude, lon: longitude });
          },
          () => console.log("Unable to retrieve your location")
        );
      } else {
        console.log("Geolocation not supported");
      }
    };

    fetchCoordinates();

    return () => {}; // Cleanup function to prevent potential issues
  }, [dispatch]);

  return null; // Assuming this is used in a React component, return null or some JSX
};
export const handleLocation = (data: any) => {
  const cityName = data.find((component: { types: string | string[] }) =>
    component.types.includes("locality")
  ).short_name;
  const stateName = data.find((component: { types: string | string[] }) =>
    component.types.includes("administrative_area_level_1")
  ).short_name;
  return {
    location: {
      city: cityName,
      state: stateName,
    },
  };
};
