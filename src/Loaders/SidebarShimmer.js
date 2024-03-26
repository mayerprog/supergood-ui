import ContentLoader from "react-content-loader";

const SidebarShimmer = () => (
  <ContentLoader
    speed={2}
    width={220}
    height={700}
    viewBox="0 0 220 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {Array.from({ length: 11 }).map((_, index) => (
      <rect
        key={index}
        x="10"
        y={20 + index * 60}
        rx="10"
        ry="10"
        width="200"
        height="40"
      />
    ))}
  </ContentLoader>
);

export default SidebarShimmer;
