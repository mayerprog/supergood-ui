import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./NewOrderShimmer.module.scss";
import { useMediaQuery } from "react-responsive";

const NewOrderShimmer = () => {
  const mediaQuery = useMediaQuery({ maxWidth: 446 });

  let width;
  if (mediaQuery) width = 300;
  else width = 400;

  return (
    <div className={styles.shimmerContainer}>
      <div className={styles.shimmerRow}>
        <ContentLoader
          speed={2}
          width={width}
          height={500}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect rx="10" ry="10" width="300" height="400" y={20} x={20} />
        </ContentLoader>
        {!mediaQuery && (
          <ContentLoader
            speed={2}
            width={600}
            height={500}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect rx="10" ry="10" width="500" height="400" y={20} x={20} />
          </ContentLoader>
        )}
      </div>
      <ContentLoader
        speed={2}
        width={width}
        height={500}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect rx="10" ry="10" width="400" height="400" y={20} x={20} />
      </ContentLoader>
    </div>
  );
};

export default NewOrderShimmer;
