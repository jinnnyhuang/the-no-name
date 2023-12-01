import { useEffect } from "react";
import { useGetProductsQuery } from "../store";
import { useSearchParams } from "react-router-dom";
import Products from "../components/Products";

const Search = () => {
  useEffect(() => {
    document.title = "Search | 還沒有名字";
  }, []);

  const [searchParams] = useSearchParams();
  const term = searchParams.get("q");
  const { data, error, isFetching } = useGetProductsQuery({ q: term });

  const empty = (
    <div className="flex flex-col items-center tracking-base">
      <div className="text-xl">No Products Found.</div>
      <div>{`0 Results for ${term}`}</div>
    </div>
  );

  let content;
  let heading;
  if (error) {
    content = <div>Error Loading Products.</div>;
  } else if (!isFetching) {
    content = data?.map((product) => {
      return <Products product={product} key={product._id} />;
    });
    heading = (data.length > 0 && <div className="mx-5 mb-1.5 lg:mx-24 text-lg tracking-base">{`${data.length} Results for ${term}`}</div>) || empty;
  }

  return (
    <div className="container m-auto">
      {heading}
      <div className="products">{content}</div>
    </div>
  );
};

export default Search;
