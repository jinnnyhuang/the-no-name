import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../store";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";
import ErrorLoading from "../components/ErrorLoading";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useGetProductsQuery({ _page: page, _limit: process.env.REACT_APP_DEFAULT_PER_PAGE });

  useEffect(() => {
    document.title = "The No Name Yet | 還沒有名字";
  }, []);

  let content;
  if (error) {
    content = <ErrorLoading />;
  } else if (isFetching) {
    content = <Skeleton times={+process.env.REACT_APP_DEFAULT_PER_PAGE}></Skeleton>;
  } else if (!isFetching) {
    content = data?.products?.map((product) => {
      return <Products product={product} key={product._id} />;
    });
  }

  return (
    <main className="products-container container m-auto main-height">
      <div className="products">{content}</div>
      <Pagination currentPages={page} total={data?.total || 0} onClick={(page) => setPage(page)} />
    </main>
  );
};

export default Home;
