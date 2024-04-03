import { updateSelected } from "../redux/slices/addressSlice";

export const makeExistingAddressSelected = (
  addressList,
  inputAddress,
  dispatch
) => {
  const foundIndex = addressList.findIndex(
    (item) => item.address === inputAddress
  ).id;
  dispatch(updateSelected(foundIndex));
};
