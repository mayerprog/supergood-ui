import { setLoyaltyCard } from "../redux/slices/orderSlice";

export const defineLoyaltyInfo = (spent, level, dispatch) => {
  switch (level) {
    case "START":
      dispatch(
        setLoyaltyCard({
          levelRusName: "Приветственный уровень",
          levelEngName: "START",
          cashback: "7",
          nextCashback: "10",
          nextRequirement: "10000",
          untilRequirement: 10000 - spent,
          backgroundColor: "#EAF2B6",
        })
      );
      break;
    case "GOOD":
      dispatch(
        setLoyaltyCard({
          levelRusName: "Продвинутый уровень",
          levelEngName: "GOOD",
          cashback: "10",
          nextCashback: "15",
          nextRequirement: "25000",
          untilRequirement: 25000 - spent,
          backgroundColor: "#D3E5F9",
        })
      );
      break;
    case "SUPERGOOD":
      dispatch(
        setLoyaltyCard({
          levelRusName: "Эксклюзивный уровень",
          levelEngName: "SUPERGOOD",
          cashback: "15",
          nextCashback: "15",
          nextRequirement: "",
          untilRequirement: null,
          backgroundColor: "#FBEED5",
        })
      );
      break;
    default:
      return;
  }
};
