import ContentLoader from "react-content-loader";

const ItemsShimmer = () => (
  <ContentLoader
    speed={2}
    width={1024}
    height={1700}
    viewBox="0 0 1024 1700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
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
);

export default ItemsShimmer;
