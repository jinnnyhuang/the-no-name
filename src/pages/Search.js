import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../store";
import { useSearchParams } from "react-router-dom";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import ErrorLoading from "../components/ErrorLoading";

const Search = () => {
  useEffect(() => {
    document.title = "Search | 還沒有名字";
  }, []);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const term = searchParams.get("q");
  const { data, error, isFetching } = useGetProductsQuery({ q: term, _page: page, _limit: process.env.REACT_APP_DEFAULT_PER_PAGE });

  const empty = (
    <div className="no-results flex flex-col items-center tracking-base">
      <h1 className="no-results-heading text-xl mb-1.5">抱歉，找不到任何結果</h1>
      <p>{`0 Results for ${term}`}</p>
    </div>
  );

  let content;
  let heading;
  if (error) {
    content = <ErrorLoading />;
  } else if (!isFetching) {
    content = data?.products?.map((product) => {
      return <Products product={product} key={product._id} />;
    });
    heading = <p className="content-heading mx-5 mb-5 lg:mx-24 lg:mb-12 text-lg tracking-base">{`${data?.total} Results for ${term}`}</p>;
  }

  return (
    <main className="products-container container m-auto main-height">
      {data?.total !== 0 && heading}
      {data?.total !== 0 ? <div className="products">{content}</div> : empty}
      <Pagination currentPages={page} total={data?.total || 0} onClick={(page) => setPage(page)} />
    </main>
  );
};

export default Search;
