import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
export const useGooglePlaces = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    language: "en",
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_ID,
    debounce: 300,
    options: {
      types: ["(regions)"],
    },
  });
  return {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  };
};
