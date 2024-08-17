import axios from "axios";

const getCity = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process
        .env.GOOGLE_PLACES_API_KEY!}`
    );
    const data = response.data;
    if (data.status === "OK") {
      const addressComponents = data.results[0].address_components;
      return addressComponents;
    }
  } catch (error: any) {
    throw error;
  }
};

export default getCity;
