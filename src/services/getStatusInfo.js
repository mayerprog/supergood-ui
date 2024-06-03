import statusType from "../statusType";

export const getStatusInfo = (status, setActiveStep) => {
  switch (status) {
    case statusType.orderStatusInProcess:
      setActiveStep && setActiveStep(2);
      return "Выполняется";
    case statusType.orderStatusCompleted:
      setActiveStep && setActiveStep(4);
      return "Выполнен";
    case statusType.orderStatusDelivered:
      setActiveStep && setActiveStep(3);
      return "Доставлен курьером";
    case statusType.orderStatusDispatched:
      setActiveStep && setActiveStep(3);
      return "Отправлен с курьером";
    case statusType.orderStatusCanceled:
      setActiveStep && setActiveStep(5);
      return "Отменён";
    // case statusType.orderStatusWaitPayment:
    //   return "Ожидание оплаты";
    case statusType.orderStatusConnectionLost:
      setActiveStep && setActiveStep(5);
      return "Соединение потеряно";
    case statusType.orderStatusUnknown:
      setActiveStep && setActiveStep(5);
      return "Статус неизвестен";
    case statusType.orderStatusPrepared:
      setActiveStep && setActiveStep(2);
      return "Укомплектован";
    case statusType.orderStatusOnFilial:
      setActiveStep && setActiveStep(1);
      return "Принят на филиале";
    case statusType.orderStatusStopped:
      setActiveStep && setActiveStep(5);
      return "Остановлен";
    case statusType.orderStatusOnFilial2:
      setActiveStep && setActiveStep(1);
      return "Приём филиалом";
    default:
      setActiveStep && setActiveStep(5);
      return "Неизвестный статус";
  }
};
