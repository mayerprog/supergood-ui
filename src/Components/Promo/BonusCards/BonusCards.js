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
          {message ? <h3>Ваш статус лояльности</h3> : null}

          <span className={styles.level}>{card.levelRusName}</span>
          <h1>{card.levelEngName}</h1>
          <h3>{`Кешбэк ${card.cashback} %`}</h3>
          {!(card.levelEngName === "SUPERGOOD") ? (
            !message ? (
              <span>{message}</span>
            ) : (
              <span>{`${message} ${card.untilRequirement} руб. и ваш кэшбэк вырастет до ${card.nextCashback}%`}</span>
            )
          ) : null}
        </div>
      ))}
    </>
  );
};

export default BonusCards;
