import axios from "axios";
import { baseURL } from "../config.js";

// const path = "/tasks";

const instance = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const itemAPI = {
  async getItems(deptid) {
    try {
      const response = await instance.post(`/getItems`, { deptid: deptid });
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
  async getFile(uid) {
    try {
      const response = await instance.post(`/getFile`, {
        uid: uid,
      });
      console.log("files", response);
      return response;
    } catch (err) {
      console.error(
        "Error getting products:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get all products. Check console for details.");
    }
  },
};
