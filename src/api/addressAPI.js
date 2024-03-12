import axios from "axios";
// import { baseURL } from "../config.js";

// const path = "/tasks";

const instance = axios.create({
  //   baseURL: baseURL + path,
  baseURL: "https://api-test.supergood1.ru",
  // withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  // },
});

export const addressAPI = {
  async postAddress(lat, long) {
    try {
      const response = await instance.post(`/getaddress.php`, {
        lat,
        long,
      });
      console.log("address", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error posting address:",
        err.response ? err.response.data : err
      );
      console.log("Failed to post address. Check console for details.");
    }
  },
};
