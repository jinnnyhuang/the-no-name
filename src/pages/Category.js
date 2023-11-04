import { useEffect } from "react";
import { useGetProductsQuery } from "../store";
import { useParams } from "react-router-dom";
import Products from "../components/Products";

const Category = () => {
  const { category } = useParams();
  const { data, error, isFetching } = useGetProductsQuery({ category });

  useEffect(() => {
    document.title = `${category} | 還沒有名字`;
  }, [category]);

  let content;
  if (error) {
    content = <div>Error Loading Products.</div>;
  } else if (!isFetching) {
    content = data?.map((product) => {
      return <Products product={product} key={product.id} />;
    });
  }

  return (
    <div className="container m-auto">
      <h2 className="font-medium text-lg uppercase tracking-wide m-5 lg:mx-24 lg:mb-12">{category}</h2>
      <div className="products">{content}</div>
    </div>
  );
};

export default Category;
