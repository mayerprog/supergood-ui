const statusType = {
  // 999 Выполняется
  orderStatusInProcess: 999,
  // 300  Выполнен
  orderStatusCompleted: 300,
  // 50  Доставлен курьером
  orderStatusDelivered: 50,
  // 40 Отправлен с курьером
  orderStatusDispatched: 40,
  orderStatusCanceled: 100,
  orderStatusWaitPayment: 3,
  orderStatusConnectionLost: 4,
  orderStatusUnknown: 0,
  // 63  Укомплектован
  orderStatusPrepared: 63,
  // 90  Принят на филиале
  orderStatusOnFilial: 90,
  // 120 Остановлен
  orderStatusStopped: 120,
  // 500 Приём филиалом
  orderStatusOnFilial2: 500,
};

export default statusType;
