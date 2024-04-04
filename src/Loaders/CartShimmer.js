import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";

const CartShimmer = () => {
  const mediaQuery = useMediaQuery({ maxWidth: 1745 });

  const width = !mediaQuery ? "380" : "250";

  return (
    <div
      style={{
        flex: "1",
        position: "sticky",
        top: "calc(100vh - 900px)",
        height: "380px",
      }}
    >
      <ContentLoader
        speed={2}
        width={width}
        height={800}
        viewBox={`0 0 ${width} 800`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect rx="10" ry="10" width={width} height="700" y={20} />
      </ContentLoader>
    </div>
  );
};

export default CartShimmer;
