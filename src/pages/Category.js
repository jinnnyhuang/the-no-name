import { useEffect } from "react";
import { useGetProductsQuery } from "../store";
import { useParams, useNavigate } from "react-router-dom";
import Products from "../components/Products";
// import { categories } from "../data";

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { data, error, isFetching } = useGetProductsQuery({ category });
  const noData = !isFetching && data.length === 0;

  useEffect(() => {
    noData && navigate("/");
    document.title = `${category} | 還沒有名字`;
    // let isMatch = false;
    // for (let i = 0; i < categories.length; i++) {
    //   if (isMatch) break;
    //   isMatch = category === categories[i].label;
    //   i === categories.length - 1 && !isMatch && navigate("/");
    // }
  }, [noData, navigate, category]);

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
