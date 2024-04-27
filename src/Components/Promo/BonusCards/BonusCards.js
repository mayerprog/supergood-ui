import styles from "./BonusCards.module.scss";

const BonusCards = ({ cards, message, isModal }) => {
  return (
    <>
      {cards.map((card, index) => (
        <div
          className={styles.loyaltyContainer}
          style={{
            "--promo-bg-color": card.backgroundColor,
          }}
          key={index}
          data-is-modal={isModal ? "true" : "false"}
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

export default BonusCards;
