import ContentLoader from "react-content-loader";

const SidebarShimmer = () => (
  <div
    style={{
      position: "sticky",
      top: "50px",
      height: "380px",
    }}
  >
    <ContentLoader
      speed={2}
      width={220}
      height={700}
      viewBox="0 0 220 700"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <rect
          key={index}
          y={20 + index * 60}
          rx="10"
          ry="10"
          width="220"
          height="40"
        />
      ))}
    </ContentLoader>{" "}
  </div>
);

export default SidebarShimmer;
