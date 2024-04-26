import PromoCards from "../../Components/Promo/PromoCards/PromoCards";
import styles from "./LoyaltyPage.module.scss";

const LoyaltyPage = () => {
  const cards = [
    {
      levelRusName: "Приветственный уровень",
      levelEngName: "START",
      cashBack: "Кешбэк 7%",
      backgroundColor: "#ebd09484",
    },
    {
      levelRusName: "Продвинутый уровень",
      levelEngName: "GOOD",
      cashBack: "Кешбэк 10%",
      backgroundColor: "#bed0eb",
    },
    {
      levelRusName: "Эксклюзивный уровень",
      levelEngName: "SUPERGOOD",
      cashBack: "Кешбэк 15%",
      backgroundColor: "#ade8d2",
    },
  ];
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
      <PromoCards cards={cards} message={null} isModal={false} />
    </div>
  );
};

export default LoyaltyPage;
