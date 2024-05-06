import { itemAPI } from "../api/itemAPI";

export const fetchImage = async ({
  uid,
  width,
  height,
  setImageUrl,
  setLoaded,
}) => {
  try {
    const url = await itemAPI.getFile({
      uid: uid,
      width: width,
      height: height,
    });
    setImageUrl(url);
    if (setLoaded) {
      setLoaded(true);
    }
  } catch (err) {
    console.log(err);
  }
};
