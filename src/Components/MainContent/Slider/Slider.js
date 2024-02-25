import styles from "./Slider.module.scss";

const Slider = ({ slides, currentIndex }) => {
  return (
    <div className={styles.container}>
      <img
        src={slides[currentIndex].image}
        alt={`Slide ${currentIndex + 1}`}
        className={styles.bannerImg}
        onClick={() => window.open(slides[currentIndex].link, "_blank")}
      />
    </div>
  );
};

export default Slider;
