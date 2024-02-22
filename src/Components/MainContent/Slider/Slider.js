import styles from "./Slider.module.scss";

const Slider = ({ slide, index }) => {
  return (
    <div className={styles.container}>
      <img
        src={slide.image}
        alt={`Slide ${index + 1}`}
        className={styles.bannerImg}
      />
    </div>
  );
};

export default Slider;
