import axios from "axios";

export const getLatitudeAndLongitude = async (address: string) => {
  try {
    if (address) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_PLACES_API_KEY}`
      );

      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("No results found for the provided address");
      }
    } else {
      throw new Error("Address is not provided");
    }
  } catch (error) {
    throw error;
  }
};
