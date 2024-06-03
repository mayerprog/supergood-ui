import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./OrdersShimmer.module.scss";
import { useMediaQuery } from "react-responsive";

const OrdersShimmer = () => {
  const mediaQuery = useMediaQuery({ maxWidth: 446 });

  let width;
  if (mediaQuery) width = 400;
  else width = 600;

  return (
    <div className={styles.shimmerContainer}>
      <div className={styles.shimmerRow}>
        <ContentLoader
          speed={2}
          width={width}
          height="100vh"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect rx="10" ry="10" width="500" height="700" y={20} x={20} />
        </ContentLoader>
        {!mediaQuery && (
          <ContentLoader
            speed={2}
            width={width}
            height="100vh"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect rx="10" ry="10" width="500" height="700" y={20} x={20} />
          </ContentLoader>
        )}
      </div>
    </div>
  );
};

export default OrdersShimmer;
