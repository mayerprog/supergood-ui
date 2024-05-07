import axios from "axios";
import { baseURL } from "../config.js";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const userAPI = {
  async getUserPref(token) {
    try {
      const response = await instance.post(`/getuserpref.php`, {
        token,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error getting user prefs:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get user prefs. Check console for details.");
    }
  },
};
