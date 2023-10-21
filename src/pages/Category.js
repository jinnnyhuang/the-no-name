import { useEffect } from "react";
import { useGetProductsQuery } from "../store";
import { useParams } from "react-router-dom";
import Products from "../components/Products";

const Category = () => {
  const { category } = useParams();

  useEffect(() => {
    document.title = `${category} | 還沒有名字`;
  }, [category]);

  const { data, error, isFetching } = useGetProductsQuery({ category });

  return (
    <div className="container m-auto">
      <Products data={data} error={error} isFetching={isFetching} />
    </div>
  );
};

export default Category;
