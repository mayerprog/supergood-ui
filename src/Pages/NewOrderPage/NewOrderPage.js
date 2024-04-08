import { useEffect } from "react";
import styles from "./NewOrderPage.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import OrderCart from "../../Components/Cart/OrderCart/OrderCart";
import Payment from "../../Components/Payment/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrders, setOrderInfo } from "../../redux/slices/orderSlice";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { v4 as uuidv4 } from "uuid";

const NewOrderPage = ({
  userInfoRef,
  toggleUserInfoVisibility,
  addressRef,
  isUserInfoOpen,
  isModalAddressOpen,
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const addressSelected = useSelector((state) => state.address.addressSelected);
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const now = new Date();

  // Formatting the date as DD.MM.YYYY
  const formattedDate =
    now.getDate().toString().padStart(2, "0") +
    "." +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    now.getFullYear().toString();

  // Formatting the time as HH:mm
  const formattedTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const handleSetOrderInfo = () => {
    const orderInfoToDispatch = {
      orderId: uuidv4(),
      address: addressSelected,
      noContact: true,
      payAmount: itemsSum,
      payType: "Наличными курьеру",
      status: "Pending",
      date: formattedDate,
      time: formattedTime,
      items: cartItems,
    };
    dispatch(addOrders(orderInfoToDispatch));
    dispatch(removeAllItems());
  };

  return (
    <div className={styles.container}>
      <h2>Оформление заказа</h2>
      <div className={styles.content}>
        <div className={styles.addressCartContainer}>
          <AddressModal
            isModal={false}
            mapWrapperRef={mapWrapperRef}
            setIsMapOpen={setIsMapOpen}
            isMapOpen={isMapOpen}
          />
          <OrderCart />
        </div>
        <Payment handleSetOrderInfo={handleSetOrderInfo} />
      </div>

      {isUserInfoOpen && (
        <div className={styles.cardOverlay}>
          <UserInfo
            userInfoRef={userInfoRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
          />
        </div>
      )}
      {isModalAddressOpen && (
        <div className={styles.cardOverlay}>
          <AddressModal addressRef={addressRef} isModal={true} />
        </div>
      )}
    </div>
  );
};

export default NewOrderPage;
