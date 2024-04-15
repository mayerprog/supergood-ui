import styles from "./SocialMedia.module.scss";
import vk from "../../assets/social-networks/vk.png";
import telegram from "../../assets/social-networks/telegram.png";
import discount from "../../assets/social-networks/discount.png";
import phone from "../../assets/social-networks/phone.png";

const SocialMedia = () => {
  return (
    <div className={styles.socialMedia}>
      <a
        href="https://vk.com/supergoodru"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={vk} alt="vk" />
      </a>
      <a
        href="https://t.me/supergoodru"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={telegram} alt="telegram" />
      </a>
      <a
        href="https://supergood.ru/akcii"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={discount} alt="discount" />
      </a>
      <a
        href="https://supergood.ru/akcii"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={phone} alt="phone" />
      </a>
    </div>
  );
};

export default SocialMedia;
