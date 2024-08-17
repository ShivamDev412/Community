import axios from "axios";
const getPlaceId = async (
  latitude: number,
  longitude: number,
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${latitude},${longitude}&inputtype=textquery&fields=place_id&key=${import.meta.env.VITE_GOOGLE_MAPS_API_ID}`
    );

    if (response.data.status === "OK") {
      const placeId = response.data.candidates[0].place_id;
      return placeId;
    } else {
      throw new Error("Failed to retrieve place ID");
    }
  } catch (error) {
    throw error;
  }
};
export default getPlaceId;
