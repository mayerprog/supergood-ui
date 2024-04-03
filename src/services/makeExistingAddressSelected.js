import { updateSelected } from "../redux/slices/addressSlice";

export const makeExistingAddressSelected = (
  addressList,
  inputAddress,
  dispatch
) => {
  const foundId = addressList.find((item) => item.address === inputAddress).id;
  dispatch(updateSelected(foundId));
};
