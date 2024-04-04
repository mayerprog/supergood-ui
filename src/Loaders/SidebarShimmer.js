import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";

const SidebarShimmer = () => {
  const mediaQuery = useMediaQuery({ maxWidth: 1745, minWidth: 1481 });

  const width = !mediaQuery ? "220" : "180";
  return (
    <div
      style={{
        flex: "1",
        position: "sticky",
        top: "calc(100vh - 840px)",
        height: "380px",
      }}
    >
      <ContentLoader
        speed={2}
        width={width}
        height={700}
        viewBox={`0 0 ${width} 700`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <rect
            key={index}
            y={20 + index * 60}
            rx="10"
            ry="10"
            width={width}
            height="40"
          />
        ))}
      </ContentLoader>
    </div>
  );
};

export default SidebarShimmer;
