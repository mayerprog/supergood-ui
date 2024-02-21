import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./AddItemBox.module.scss";

const AddItemBox = ({
  count,
  increment,
  decrement,
  backgroundColor,
  boxShadow,
  width,
  color,
  margin,
}) => {
  const dynamicStyle = {
    "--counter-bg-color": backgroundColor,
    "--counter-box-shadow": boxShadow,
    "--counter-width": width,
    "--counter-color": color,
    "--counter-margin": margin,
  };
  return (
    <button className={styles.counter} style={dynamicStyle}>
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
