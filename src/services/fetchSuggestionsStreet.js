import axios from "axios";
import { addressAPI } from "../api/addressAPI";

export const fetchSuggestionsStreet = async (
  input,
  setSuggestions,
  setShowDropdown
) => {
  if (!input) {
    setSuggestions([]);
    setShowDropdown(false);
    return;
  }

  try {
    const response = await addressAPI.getAddressList(input);
    if (response) {
      const data = Object.values(response.streets);
      console.log("data", data);
      setSuggestions(data);
      setShowDropdown(true);
    }
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
  }
};
