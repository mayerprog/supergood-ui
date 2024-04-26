import styles from "./PromoCards.module.scss";

const PromoCards = ({ cards, message }) => {
  return (
    <>
      {cards.map((card, index) => (
        <div
          className={styles.loyaltyContainer}
          style={{
            "--promo-bg-color": card.backgroundColor,
          }}
          key={index}
        >
          <h3>Ваш статус лояльности</h3>

          <span className={styles.level}>{card.levelRusName}</span>
          <h1>{card.levelEngName}</h1>
          <h4>{card.cashBack}</h4>
          <span>{message}</span>
        </div>
      ))}
    </>
  );
};

export default PromoCards;
