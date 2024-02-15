import styles from "./Products.module.scss";

const Products = () => {
  const items = [
    "Пиццы",
    "Комбо",
    "Закуски",
    "Напитки",
    "Коктейли",
    "Кофе",
    "Десерты",
    "Соусы",
    "Другие товары",
    "Акции",
  ];
  return (
    <div className={styles.products}>
      {items.map((item, index) => (
        <button key={index} className={styles.card}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Products;
