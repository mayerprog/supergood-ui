import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./AddItemBox.module.scss";

const AddItemBox = ({ count, increment, decrement }) => {
  return (
    <button className={styles.counter}>
      <button onClick={decrement} className={styles.counterButton}>
        <AiOutlineMinus />
      </button>
      <span className={styles.count}>{count}</span>
      <button onClick={increment} className={styles.counterButton}>
        <AiOutlinePlus />
      </button>
    </button>
  );
};

export default AddItemBox;
