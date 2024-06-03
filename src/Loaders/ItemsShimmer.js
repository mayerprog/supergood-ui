import React from "react";
import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";
import styles from "./ItemsShimmer.module.scss";

const ItemsShimmer = () => {
  const isSmallScreen = useMediaQuery({ minWidth: 880, maxWidth: 1023 });
  const isExtraSmallScreen = useMediaQuery({ maxWidth: 960 });
  const isSuperLargeScreen = useMediaQuery({ minWidth: 1500, maxWidth: 1700 });
  const isLargeScreen = useMediaQuery({ minWidth: 1281, maxWidth: 1500 });

  let width;
  if (isSmallScreen) width = 220;
  else if (isExtraSmallScreen) width = 180;
  else if (isLargeScreen) width = 180;
  else if (isSuperLargeScreen) width = 220;
  else width = 240;

  return (
    <div className={styles.container}>
      <ContentLoader
        speed={2}
        width="100%"
        height={1700}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <rect
            key={index}
            x={(index % 4) * (width + 20)}
            y={Math.floor(index / 4) * (width + 150)}
            rx="10"
            ry="10"
            width={width}
            height={width * 1.5}
          />
        ))}
      </ContentLoader>
    </div>
  );
};

export default ItemsShimmer;
