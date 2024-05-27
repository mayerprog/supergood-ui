import { useEffect } from "react";
import { addressAPI } from "../api/addressAPI";

export const useGetPoly = (setPoints, polyFew) => {
  useEffect(() => {
    (async () => {
      try {
        let data;
        !polyFew
          ? (data = await addressAPI.getPoly())
          : (data = await addressAPI.getPolyFew());

        const polygonArray = [];
        const polyMap = new Map();

        const points = data.points;

        const polyValues = Object.values(points);

        for (let i = 0; i < polyValues.length; i++) {
          if (polyMap.has(polyValues[i].dept_id)) {
            polyMap
              .get(polyValues[i].dept_id)
              .push([polyValues[i].latitude, polyValues[i].longitude]);
          } else {
            polyMap.set(polyValues[i].dept_id, []);
          }
        }
        // push arrays of points to polygonArray
        for (let item of polyMap.values()) {
          polygonArray.push(item);
        }
        setPoints(polygonArray);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setPoints, polyFew]);
};
