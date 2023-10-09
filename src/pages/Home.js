import { useEffect } from "react";
import { useGetProductsQuery } from "../store";
import Products from "../components/Products";

const Home = () => {
  const { data, error, isFetching } = useGetProductsQuery();

  useEffect(() => {
    document.title = "The No Name Yet | 還沒有名字";
  }, []);

  return (
    <div className="container m-auto">
      <Products data={data} error={error} isFetching={isFetching} />
    </div>
  );
};

export default Home;
