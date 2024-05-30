import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useFilterOrder = (order, setFilteredItems) => {
  const ordersItems = useSelector((state) => state.order.ordersItems);

  useEffect(() => {
    if (ordersItems.length > 0) {
      const filteredOrder = ordersItems.find((item) => item.id === order.id);
      const items = Object.values(filteredOrder.lines);
      setFilteredItems(items);
    }
  }, [ordersItems, order]);
};
