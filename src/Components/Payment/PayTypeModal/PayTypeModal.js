import styles from "./PayTypeModal.module.scss";

const PayTypeModal = ({ payTypeWrapperRef }) => {
  return <div ref={payTypeWrapperRef} className={styles.container}></div>;
};

export default PayTypeModal;
