import axios from "axios";
import { addressAPI } from "../api/addressAPI";

export const fetchSuggestions = async (
  input,
  setSuggestions,
  setShowDropdown
) => {
  if (!input) {
    setSuggestions([]);
    setShowDropdown(false);
    return;
  }

  // const axiosConfig = {
  //   timeout: 10000,
  // };

  // const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //   input
  // )}`;

  try {
    // const response = await axios.get(url, axiosConfig);
    const response = await addressAPI.getAddressList(input);
    console.log("addresslist options", Object.values(response.streets));
    if (response) {
      const data = Object.values(response.streets);
      setSuggestions(data);
      setShowDropdown(true);
    }
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
  }
};
