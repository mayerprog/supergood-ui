import BonusCards from "../../Components/Promo/BonusCards/BonusCards";
import styles from "./LoyaltyPage.module.scss";

const LoyaltyPage = () => {
  return (
    <div className={styles.container}>
      <h1>Новая система лояльности SuperGood</h1>

      <div>
        <h3>Как работает бонусная система?</h3>
        <p>
          Мы дарим 1000 бонусов при регистрации на сайте и в мобильном
          приложении!
        </p>
        <p>
          Копите бонусы и оплачивайте ими до 30% стоимости заказа. 1 бонус = 1
          рубль.
        </p>
        <p>
          Чем больше вы заказываете, тем выше ваш статус и больше бонусов с
          каждого заказа!
        </p>
      </div>
      <div>
        <h3>Система лояльности</h3>
        <li>Делайте заказы на сайте и в мобильном приложении</li>
        <li>До 15% бонусами от суммы каждого заказа</li>
        <li>До 30% стоимости заказа. 1 бонус равен 1 рублю</li>
      </div>
      <div>
        <h3>Совершайте заказы и повышайте статус лояльности!</h3>
        <p>
          Станьте участником программы лояльности SuperGood. Чем больше общая
          сумма заказов, тем выше статус и размер бонусного кешбэка!
        </p>
      </div>
      <div className={styles.promoCardContainer}>
        <BonusCards
          cards={[
            {
              levelRusName: "Приветственный уровень",
              levelEngName: "START",
              cashback: "7",
              nextCashback: "10",
              nextRequirement: "",
              untilRequirement: null,
              backgroundColor: "#EAF2B6",
            },
          ]}
          message={null}
          isModal={false}
        />
        <div className={styles.promoInfo}>
          <h1>1.START</h1>
          <p>(приветственный уровень)</p>
          <span>7% бонусами с каждого заказа</span>
        </div>
      </div>
      <div className={styles.promoCardContainer}>
        <BonusCards
          cards={[
            {
              levelRusName: "Продвинутый уровень",
              levelEngName: "GOOD",
              cashback: "10",
              nextCashback: "15",
              nextRequirement: "",
              untilRequirement: null,
              backgroundColor: "#D3E5F9",
            },
          ]}
          message={null}
          isModal={false}
        />
        <div className={styles.promoInfo}>
          <h1>2.GOOD</h1>
          <p>(продвинутый уровень, при сумме заказов от 10 000 руб.)</p>
          <span>10% бонусами с каждого заказа</span>
        </div>
      </div>
      <div className={styles.promoCardContainer}>
        <BonusCards
          cards={[
            {
              levelRusName: "Эксклюзивный уровень",
              levelEngName: "SUPERGOOD",
              cashback: "15",
              nextCashback: "15",
              nextRequirement: "",
              untilRequirement: null,
              backgroundColor: "#FBEED5",
            },
          ]}
          message={null}
          isModal={false}
        />
        <div className={styles.promoInfo}>
          <h1>3.SUPERGOOD</h1>
          <p>(эксклюзивный уровень, при сумме заказов от 25 000 руб.)</p>
          <span>15% бонусами с каждого заказа</span>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
