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

  const sortedCompletedOrders = filteredCompletedOrders.sort((a, b) => {
    const dateA = new Date(a.createddate);
    const dateB = new Date(b.createddate);
    return dateB - dateA;
  });
  const sortedActivedOrders = filteredActivedOrders.sort((a, b) => {
    const dateA = new Date(a.createddate);
    const dateB = new Date(b.createddate);
    return dateB - dateA;
  });
  setCompletedOrders(sortedCompletedOrders);
  setActivedOrders(sortedActivedOrders);
};
