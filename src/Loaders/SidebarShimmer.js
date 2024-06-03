import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";

const SidebarShimmer = () => {
  // const mediaQuery = useMediaQuery({ maxWidth: 1745, minWidth: 1481 });

  // const width = !mediaQuery ? "220" : "180";
  return (
    <div
      style={{
        flex: "1",
        position: "sticky",
        top: "70px",
        height: "380px",
        paddingBottom: "250px",
      }}
    >
      <ContentLoader
        speed={2}
        width={180}
        height={700}
        viewBox={`0 0 ${180} 700`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <rect
            key={index}
            y={20 + index * 60}
            rx="10"
            ry="10"
            width={180}
            height="40"
          />
        ))}
      </ContentLoader>
    </div>
  );
};

export default SidebarShimmer;
