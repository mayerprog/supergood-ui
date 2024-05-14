import axios from "axios";
import { addressAPI } from "../api/addressAPI";

export const fetchHousesSuggestions = async (
  input,
  setSuggestions,
  setShowDropdown,
  streetid
) => {
  if (!input) {
    setSuggestions([]);
    setShowDropdown(false);
    return;
  }

  // const house = input.split(",")[1].trim();
  // const streetid = suggestions[0].streetid;

  try {
    const response = await addressAPI.getHouse(streetid, input);
    if (response) {
      const data = Object.values(response.streets);
      setSuggestions(data);
      setShowDropdown(true);
    }
  } catch (error) {
    console.error("Failed to fetch houses suggestions:", error);
  }
};
