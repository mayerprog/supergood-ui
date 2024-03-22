import axios from "axios";
// import { baseURL } from "../config.js";

// const path = "/tasks";

const instance = axios.create({
  //   baseURL: baseURL + path,
  // baseURL: "https://api-test.supergood1.ru",
  baseURL: "http://localhost:8000",
  // withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  // },
});

export const itemAPI = {
  async getItems() {
    try {
      const response = await instance.post(`/getItems`);
      console.log("items", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting products:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get all products. Check console for details.");
    }
  },
};
