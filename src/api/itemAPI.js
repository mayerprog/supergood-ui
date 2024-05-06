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
      const response = await instance.post(`/getitems.php`, { deptid: deptid });
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
  async getFile(params) {
    const { uid, width, height } = params;
    try {
      const response = await instance.get(`/getFileNew.php`, {
        params: { uid: uid, w: width, h: height },
        responseType: "blob", // This tells axios to expect a binary response instead of JSON
      });
      const url = window.URL.createObjectURL(response.data);
      // console.log("File URL", url);
      return url;
    } catch (err) {
      console.error(
        "Error getting products:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get all products. Check console for details.");
    }
  },
};
