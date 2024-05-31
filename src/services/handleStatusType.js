import statusType from "../statusType";

export const handleStatusType = (
  orders,
  setCompletedOrders,
  setActivedOrders
) => {
  const filteredCompletedOrders = [];
  const filteredActivedOrders = [];
  orders.forEach((order) => {
    order.status != statusType.orderStatusCanceled &&
    order.status != statusType.orderStatusDelivered &&
    order.status != statusType.orderStatusCompleted &&
    order.status != statusType.orderStatusConnectionLost &&
    order.status != statusType.orderStatusStopped
      ? filteredActivedOrders.push(order)
      : filteredCompletedOrders.push(order);
  });
  setCompletedOrders(filteredCompletedOrders);
  setActivedOrders(filteredActivedOrders);
};
