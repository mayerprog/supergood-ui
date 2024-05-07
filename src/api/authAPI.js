import axios from "axios";
import { baseURL } from "../config.js";

const instance = axios.create({
  baseURL: baseURL,
  // withCredentials: true, // Axios includes the cookie in the request
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const authAPI = {
  async getSms(phone) {
    try {
      const response = await instance.post(`/auth.php`, {
        phone: phone,
        os_source: "web",
      });
      console.log("data", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting sms:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get sms. Check console for details.");
    }
  },
  async login(phone, code, token) {
    try {
      const response = await instance.post(`/auth.php`, {
        phone: phone,
        code: code,
        token: token,
      });
      console.log("data", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error logging in:",
        err.response ? err.response.data : err
      );
      console.log("Failed to login. Check console for details.");
    }
  },
};
