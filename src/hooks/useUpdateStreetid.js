import { useEffect } from "react";
import { addressAPI } from "../api/addressAPI";

export const useUpdateStreetid = (street, setStreetid) => {
  useEffect(() => {
    (async () => {
      try {
        if (street) {
          const response = await addressAPI.getAddressList(street);
          if (response) {
            const data = Object.values(response.streets)[0];
            setStreetid(data.streetid);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [street]);
};
