import axios from "axios";

export const getLatitudeAndLongitude = async (locationId: string) => {
  try {
    if (locationId) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locationId}&fields=geometry&key=${process.env.GOOGLE_PLACES_API_KEY}`
      );
      console.log(response.data);
      if (
        response.data &&
        response.data.result &&
        response.data.result.geometry &&
        response.data.result.geometry.location
      ) {
        const { lat, lng } = response.data.result.geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("Invalid response from Google Places API");
      }
    } else {
      throw new Error("Location ID is not provided");
    }
  } catch (error) {
    console.error("Error fetching latitude and longitude:", error);
    throw error;
  }
};
