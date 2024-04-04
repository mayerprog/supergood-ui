import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";

const ItemsShimmer = () => {
  const mediaQuery = useMediaQuery({ maxWidth: 1745, minWidth: 1481 });

  const width = !mediaQuery ? "1080" : "1030";
  return (
    <div style={{ flex: "1" }}>
      <ContentLoader
        speed={2}
        width={width}
        height={1700}
        viewBox={`0 0 ${width} 1700`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* <rect rx="10" ry="10" width="800" height="200" x={40} /> */}
        {Array.from({ length: 20 }).map((_, index) => (
          <rect
            key={index}
            x={30 + (index % 4) * 250}
            y={Math.floor(index / 4) * 350}
            rx="10"
            ry="10"
            width="200"
            height="300"
          />
        ))}
      </ContentLoader>
    </div>
  );
};

export default ItemsShimmer;
