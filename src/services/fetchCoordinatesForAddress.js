import axios from "axios";
import { setMapPosition } from "../redux/slices/addressSlice";

export const fetchCoordinatesForAddress = async (
  address,
  dispatch,
  setMarkerAddress
) => {
  const axiosConfig = {
    timeout: 10000,
  };
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;
  try {
    const response = await axios.get(url, axiosConfig);
    console.log("response", response.data);
    if (response.data && response.data[0]) {
      const { lat, lon } = response.data[0];
      const newPosition = [parseFloat(lat), parseFloat(lon)];
      dispatch(setMapPosition(newPosition));
      setMarkerAddress(address);
    }
  } catch (error) {
    console.error("Failed to fetch coordinates:", error);
  }
};
