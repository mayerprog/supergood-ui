import { updateSelected } from "../redux/slices/userSlice";

export const makeExistingAddressSelected = (
  addressList,
  inputAddress,
  dispatch
) => {
  const foundIndex = addressList.findIndex(
    (item) => `${item.street}, ${item.yhouse}` === inputAddress
  );
  dispatch(updateSelected(foundIndex));
};
