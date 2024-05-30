export const handlePayType = (value, action) => {
  switch (value) {
    case 11:
      action("Оплата банковской картой");
      break;
    case 16:
      action("Оплата картой курьеру");
      break;
    case 1:
      action("Оплата наличными");
      break;
    default:
      return;
  }
};
