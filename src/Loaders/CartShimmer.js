import ContentLoader from "react-content-loader";

const CartShimmer = () => (
  <ContentLoader
    speed={2}
    width={330}
    height={700}
    viewBox="0 0 330 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect rx="10" ry="10" width="330" height="700" y={20} />
  </ContentLoader>
);

export default CartShimmer;
