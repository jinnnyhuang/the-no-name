import { useEffect } from "react";
import { useGetProductsQuery } from "../store";
import { useParams, useNavigate } from "react-router-dom";
import Products from "../components/Products";

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${category} | 還沒有名字`;
  }, [category]);

  const { data, error, isFetching } = useGetProductsQuery({ category });

  useEffect(() => {
    if (!isFetching) data.length === 0 && navigate("/");
  }, [isFetching, navigate]);

  return (
    <div className="container m-auto">
      <Products data={data} error={error} isFetching={isFetching} />
    </div>
  );
};

export default Category;
