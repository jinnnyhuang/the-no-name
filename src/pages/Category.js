import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../store";
import { useParams, useNavigate } from "react-router-dom";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";

const Category = () => {
  const [page, setPage] = useState(1);
  const { category } = useParams();
  const navigate = useNavigate();
  const { data, error, isFetching } = useGetProductsQuery({ category, _page: page, _limit: process.env.REACT_APP_DEFAULT_PER_PAGE });
  const noData = !error && !isFetching && data?.total === 0;

  useEffect(() => {
    noData && navigate("/");
    document.title = `${category} | 還沒有名字`;
    setPage(1);
  }, [noData, navigate, category]);

  let content;
  if (error) {
    content = <div>Error Loading Products.</div>;
  } else if (isFetching) {
    content = <Skeleton times={4}></Skeleton>;
  } else if (!isFetching) {
    content = data?.products?.map((product) => {
      return <Products product={product} key={product._id} />;
    });
  }

  return (
    <div className="container m-auto">
      <h2 className="font-medium text-lg uppercase tracking-wide m-5 lg:mx-24 lg:mb-12">{category}</h2>
      <div className="products">{content}</div>
      <Pagination currentPages={page} total={data?.total || 0} onClick={(page) => setPage(page)} />
    </div>
  );
};

export default Category;
