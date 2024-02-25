import axios from "axios";
// import { baseURL } from "../config.js";

// const path = "/tasks";

const instance = axios.create({
  //   baseURL: baseURL + path,
  baseURL: "https://api.supergood.ru",
  withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  // },
});

export const itemAPI = {
  async getItems() {
    try {
      const response = await instance.get(`/getitems.php`);
      console.log("items1", response.data);
      return response.data.items;
    } catch (err) {
      console.error(
        "Error getting products:",
        err.response ? err.response.data : err
      );
      alert("Failed to get all products. Check console for details.");
    }
  },
};
