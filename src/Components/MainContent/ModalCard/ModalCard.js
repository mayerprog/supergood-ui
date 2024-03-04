import styles from "./ModalCard.module.scss";

const ModalCard = ({ itemCardId, cardRef }) => {
  return (
    <div ref={cardRef} className={styles.container}>
      <span>{itemCardId}</span>
    </div>
  );
};

export default ModalCard;
