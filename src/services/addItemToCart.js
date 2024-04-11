import { addItems } from "../redux/slices/cartSlice";

export const addItemToCart = (info) => {
  const {
    event,
    addingInProgress,
    setAddingInProgress,
    toggleMapVisibility,
    addressList,
    dispatch,
    item,
  } = info;
  event.stopPropagation();
  if (addingInProgress)
    //for preventing multiple dispatches
    return;
  setAddingInProgress(true);
  if (addressList.length === 0) toggleMapVisibility();
  else
    dispatch(
      addItems({
        ...item,
        initialPrice: item.price,
        initialWeightout: item.params.weightout.value,
      })
    );
  setTimeout(() => setAddingInProgress(false), 300);
};
