import ContentLoader from "react-content-loader";

const CartShimmer = () => (
  <div
    style={{
      position: "sticky",
      top: "calc(100vh - 900px)",
      height: "380px",
    }}
  >
    <ContentLoader
      speed={2}
      width={330}
      height={800}
      viewBox="0 0 330 800"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect rx="10" ry="10" width="330" height="700" y={20} />
    </ContentLoader>
  </div>
);

export default CartShimmer;
