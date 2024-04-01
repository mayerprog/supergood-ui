import axios from "axios";

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

  const axiosConfig = {
    timeout: 10000,
  };

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    input
  )}`;

  try {
    const response = await axios.get(url, axiosConfig);
    if (response.data) {
      const data = response.data;
      setSuggestions(data);
      setShowDropdown(true);
    }
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
  }
};
