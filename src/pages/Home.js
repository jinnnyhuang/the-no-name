import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../store";
import Products from "../components/Products";
import Pagination from "../components/Pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  let { data, error, isFetching } = useGetProductsQuery({ _page: page, _limit: process.env.REACT_APP_DEFAULT_PER_PAGE });

  useEffect(() => {
    document.title = "The No Name Yet | 還沒有名字";
  }, []);

  let content;
  if (error) {
    content = <div>Error Loading Products.</div>;
  } else if (!isFetching) {
    content = data?.products?.map((product) => {
      return <Products product={product} key={product._id} />;
    });
  }

  return (
    <div className="container m-auto">
      <div className="products">{content}</div>
      <Pagination currentPages={page} total={data?.total || 0} onClick={(page) => setPage(page)} />
    </div>
  );
};

export default Home;
