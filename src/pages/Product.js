import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../store";
import Button from "../components/Button";
import Accordion from "../components/Accordion";
import Silder from "../components/Slider";
import Icons from "../components/Icons";
import ErrorLoading from "../components/ErrorLoading";
import useAddToCart from "../utils/useAddToCart";
import useCollection from "../utils/useCollection";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let { data, error, isFetching } = useGetProductByIdQuery(id);

  const product = !error && !isFetching && data[0];
  const { handleAddToCart } = useAddToCart();
  const { collectionIndex, handleCollection } = useCollection(product);

  useEffect(() => {
    !isFetching && error && error?.status !== "FETCH_ERROR" && navigate("/product-not-found");
    document.title = `${product?.title || "The No Name Yet"} | 還沒有名字`;
  }, [error, isFetching, navigate, product]);

  let content;
  let breadcrumb;
  if (!isFetching && error && error?.status === "FETCH_ERROR") {
    content = <ErrorLoading className="main-height" />;
  } else if (product) {
    breadcrumb = (
      <section className="breadcrumb mx-6 mb-8 lg:mx-24 lg:grid lg:grid-cols-2">
        <div className="flex gap-x-3 justify-center items-center">
          <Link to="/" className="text-neutral-400 tracking-wide uppercase">
            Home
          </Link>
          <Icons.Next className="fill-neutral-400 max-w-[1.5rem]" />
          <Link to={`/category/${product.category}`} className="text-neutral-400 tracking-wide uppercase">
            {product.category}
          </Link>
          <Icons.Next className="fill-neutral-400 max-w-[1.5rem]" />
          <span className="text-primary truncate">{product.title}</span>
        </div>
      </section>
    );

    const items = [
      {
        label: "DETAILS",
        content: product.description,
      },
      {
        label: "SIZE",
        content: product.size,
      },
    ];

    const info = (
      <div className="product-info w-[24rem] mx-auto relative">
        <h1 className="product-name text-lg">{product.title}</h1>
        <button onClick={handleCollection} className="collection !rounded absolute top-0 right-0">
          <Icons.Collection
            className={`cursor-pointer stroke-[5rem] shrink-0 transition-colors${
              collectionIndex >= 0 ? " fill-primary stroke-transparent" : " fill-white stroke-primary"
            }`}
          />
        </button>
        <h3 className="product-price mt-3.5 text-lg">
          <span className={`original-price${product.stock === 0 || product.discountPercentage < 100 ? " line-through text-neutral-400" : ""}`}>
            NT$ {product.price.toLocaleString()}
          </span>
          {product.discountPercentage < 100 && (
            <span className="discount-price ml-2">NT$ {(product.price * (product.discountPercentage / 100)).toLocaleString()}</span>
          )}
        </h3>
        {product.stock < 5 && product.stock !== 0 && (
          <h4 className="product-stock">
            <span className="text-sm label-neutral">剩餘庫存 {product.stock}</span>
          </h4>
        )}
        {product.stock === 0 ? (
          <Button className="cursor-not-allowed w-button mt-4 tracking-wider" tabIndex={-1}>
            Sold Out
          </Button>
        ) : (
          <Button primary transition className="w-button mt-7.5" onClick={() => handleAddToCart(product)}>
            加入購物車
          </Button>
        )}
        <Accordion items={items} className="product-description mt-12 text-sm w-full" />
      </div>
    );

    content = (
      <section className="main-content product-height h-md:min-h-[65vh] h-lg:product-height grid grid-cols-1 lg:grid-cols-2 gap-y-14 items-start lg:mx-24">
        <Silder items={product} />
        {info}
      </section>
    );
  }

  return (
    <main className="container m-auto">
      {breadcrumb}
      {content}
    </main>
  );
};

export default Product;
