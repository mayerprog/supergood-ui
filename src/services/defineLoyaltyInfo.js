export const defineLoyaltyInfo = (spent, level, setCards) => {
  switch (level) {
    case "START":
      setCards([
        {
          levelRusName: "Приветственный уровень",
          levelEngName: "START",
          cashback: "7",
          nextCashback: "10",
          nextRequirement: "10000",
          untilRequirement: 10000 - spent,
          backgroundColor: "#EAF2B6",
        },
      ]);
      break;
    case "GOOD":
      setCards([
        {
          levelRusName: "Продвинутый уровень",
          levelEngName: "GOOD",
          cashback: "10",
          nextCashback: "15",
          nextRequirement: "25000",
          untilRequirement: 25000 - spent,
          backgroundColor: "#D3E5F9",
        },
      ]);
      break;
    case "SUPERGOOD":
      setCards([
        {
          levelRusName: "Эксклюзивный уровень",
          levelEngName: "SUPERGOOD",
          cashback: "15",
          nextCashback: "15",
          nextRequirement: "",
          untilRequirement: null,
          backgroundColor: "#FBEED5",
        },
      ]);
      break;
    default:
      return;
  }
};
