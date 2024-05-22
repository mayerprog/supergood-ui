import { orderAPI } from "../api/orderAPI";

export const handleClickSubmit = async (params) => {
  const {
    token,
    salesid,
    cartItems,
    action,
    navigate,
    addressSelected,
    setErrMessage,
    setItemsUnavailable,
  } = params;
  if (cartItems.length > 0) {
    try {
      const response = await orderAPI.getMinSum({
        token,
        salesid,
        addressid: addressSelected.addressid,
      });
      if (response.status === "ok") {
        action(false);
        navigate("/submit");
      } else {
        if (response.errorcode === 2500) {
          setErrMessage(response.msg);
        }
        if (response.errorcode === 200) {
          setErrMessage(response.msg);
          const errorItems = response.params.items;
          //   const errorItems = [
          //     { itemid: 52385, name: "Брускетта со слабосоленым лососем и авокадо" },
          //     { itemid: 50607, name: "Суп-лапша с куриными фрикадельками" },
          //   ]; // hardcode for testing

          const foundItems = cartItems.filter((cartItem) =>
            errorItems.some((errorItem) => errorItem.itemid === cartItem.itemid)
          );
          setItemsUnavailable(foundItems);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};