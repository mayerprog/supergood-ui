import { itemAPI } from "../api/itemAPI";

export const fetchImage = async ({ uid, width, height, setImageUrl }) => {
  try {
    const url = await itemAPI.getFile({
      uid: uid,
      width: width,
      height: height,
    });
    setImageUrl(url);
  } catch (err) {
    console.log(err);
  }
};
