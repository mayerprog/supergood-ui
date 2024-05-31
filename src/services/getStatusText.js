import statusType from "../statusType";

export const getStatusText = (status) => {
  switch (status) {
    case statusType.orderStatusInProcess:
      return "Выполняется";
    case statusType.orderStatusCompleted:
      return "Выполнен";
    case statusType.orderStatusDelivered:
      return "Доставлен курьером";
    case statusType.orderStatusDispatched:
      return "Отправлен с курьером";
    case statusType.orderStatusCanceled:
      return "Отменён";
    case statusType.orderStatusWaitPayment:
      return "Ожидание оплаты";
    case statusType.orderStatusConnectionLost:
      return "Соединение потеряно";
    case statusType.orderStatusUnknown:
      return "Неизвестный статус";
    case statusType.orderStatusPrepared:
      return "Укомплектован";
    case statusType.orderStatusOnFilial:
      return "Принят на филиале";
    case statusType.orderStatusStopped:
      return "Остановлен";
    case statusType.orderStatusOnFilial2:
      return "Приём филиалом";
    default:
      return "Неизвестный статус";
  }
};
