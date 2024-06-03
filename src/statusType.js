const statusType = {
  // 999 Выполняется - готовка
  orderStatusInProcess: 999,
  // 300  Выполнен - last
  orderStatusCompleted: 300,
  // 50  Доставлен курьером - курьер
  orderStatusDelivered: 50,
  // 40 Отправлен с курьером - курьер
  orderStatusDispatched: 40,

  // 100 Отменён - отдельный значок
  orderStatusCanceled: 100,

  // // 3 Ожидает оплаты - ничего нет
  // orderStatusWaitPayment: 3,  НЕ ДОЛЖНО БЫТЬ ПРИ ОПЛАТЕ НАЛОМ

  // 4 Отменён - отдельный значок ошибки
  orderStatusConnectionLost: 4,

  // 0 Статус неизвестен - отдельный значок ошибки
  orderStatusUnknown: 0,

  // 63  Укомплектован - готовка
  orderStatusPrepared: 63,
  // 90  Принят на филиале - галочка
  orderStatusOnFilial: 90,
  // 120 Остановлен - отдельный значок ошибки
  orderStatusStopped: 120,
  // 500 Приём филиалом - галочка
  orderStatusOnFilial2: 500,
};

export default statusType;
