import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSum } from "../redux/slices/cartSlice";

export const useUpdateSumHook = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      if (cartItems) {
        const sum = cartItems.reduce(
          (accumulator, currentValue) => accumulator + currentValue.price,
          0
        );
        dispatch(updateSum(sum));
      }
    }
  }, [cartItems, isAuth, dispatch]);
};
