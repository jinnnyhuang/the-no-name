import { useEffect } from "react";
import { useGetProductsQuery } from "../store";
import Products from "../components/Products";

const Home = () => {
  const { data, error, isFetching } = useGetProductsQuery();

  useEffect(() => {
    document.title = "The No Name Yet | 還沒有名字";
  }, []);

  let content;
  if (error) {
    content = <div>Error Loading Products.</div>;
  } else if (!isFetching) {
    content = data?.map((product) => {
      return <Products product={product} key={product._id} />;
    });
  }

  return (
    <div className="container m-auto">
      <div className="products">{content}</div>
    </div>
  );
};

export default Home;
