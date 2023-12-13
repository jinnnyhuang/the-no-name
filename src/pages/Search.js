import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../store";
import { useSearchParams } from "react-router-dom";
import Products from "../components/Products";
import Pagination from "../components/Pagination";

const Search = () => {
  useEffect(() => {
    document.title = "Search | 還沒有名字";
  }, []);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const term = searchParams.get("q");
  const { data, error, isFetching } = useGetProductsQuery({ q: term, _page: page, _limit: process.env.REACT_APP_DEFAULT_PER_PAGE });

  const empty = (
    <div className="flex flex-col items-center tracking-base">
      <div className="text-xl mb-1.5">抱歉，找不到任何結果</div>
      <div>{`0 Results for ${term}`}</div>
    </div>
  );

  let content;
  let heading;
  if (error) {
    content = <div>Error Loading Products.</div>;
  } else if (!isFetching) {
    content = data?.products?.map((product) => {
      return <Products product={product} key={product._id} />;
    });
    heading = (data?.total > 0 && <div className="mx-5 mb-1.5 lg:mx-24 text-lg tracking-base">{`${data?.total} Results for ${term}`}</div>) || empty;
  }

  return (
    <div className="container m-auto">
      {heading}
      <div className="products">{content}</div>
      <Pagination currentPages={page} total={data?.total || 0} onClick={(page) => setPage(page)} />
    </div>
  );
};

export default Search;
