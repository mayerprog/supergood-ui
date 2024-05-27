import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./PromoErrorModal.module.scss";
import ModalsContext from "../../../contexts/ModalsContext";
import { useDispatch, useSelector } from "react-redux";
import { putToCartAPI } from "../../../services/putToCartAPI";
import { cartAPI } from "../../../api/cartAPI";
import { getOrderInfo } from "../../../services/getOrderInfo";

const PromoErrorModal = () => {
  const minAmount = useSelector((state) => state.cart.minAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);

  const { promoErrorWrapperRef, togglePromoErrorVisibility } =
    useContext(ModalsContext);

  const dispatch = useDispatch();

  const handleRemovePromo = async () => {
    const promoItem = cartItems.find((item) => item.promocode != null);
    const response = await cartAPI.deleteItem({
      token,
      salesid,
      id: promoItem.id,
    });
    if (response.status === "ok") {
      await getOrderInfo({ token, salesid, dispatch });
    }
    togglePromoErrorVisibility();
  };

  return (
    <div ref={promoErrorWrapperRef} className={styles.container}>
      <div onClick={togglePromoErrorVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <h2>
        Промокод не может быть применен, если сумма заказа станет меньше{" "}
        {minAmount} рублей. Удалить промокод?
      </h2>

      <div className={styles.buttonsContainer}>
        <button className={styles.buttonCancel} onClick={handleRemovePromo}>
          <span className={styles.buttonText}>Да</span>
        </button>

        <button
          className={styles.buttonStyle}
          onClick={togglePromoErrorVisibility}
        >
          <span className={styles.buttonText}>Отмена</span>
        </button>
      </div>
    </div>
  );
};

export default PromoErrorModal;
