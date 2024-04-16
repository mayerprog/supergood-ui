import styles from "./SearchField.module.scss";
import { CiSearch } from "react-icons/ci";

const SearchField = ({ setSearchQuery }) => {
  return (
    <div className={styles.inputWrapper}>
      <CiSearch className={styles.inputIcon} size={20} />
      <input
        className={styles.input}
        placeholder="Найти блюдо"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
