import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../store";
import Button from "../components/Button";
import Accordion from "../components/Accordion";
import Silder from "../components/Slider";
import Icons from "../components/Icons";
import useAddToCart from "../utils/useAddToCart";
import useCollection from "../utils/useCollection";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isFetching } = useGetProductsQuery({ id });
  const { modal, handleAddToCart } = useAddToCart();

  const product = !isFetching && data[0];
  const { collectionIndex, handleCollection } = useCollection(product);

  useEffect(() => {
    !isFetching && !product && navigate("/product-not-found");
    document.title = product && `${product.title} | 還沒有名字`;
  }, [isFetching, navigate, product]);

  let content;
  let breadcrumb;
  if (error) {
    content = <div className="text-center">Error Loading Product.</div>;
  } else if (!isFetching && data.length !== 0) {
    // const product = data[0];
    let thumbnailURL;
    if (!product.thumbnail) {
      thumbnailURL = product.images.filter((image, index) => index === 0)[0];
    } else {
      thumbnailURL = product.thumbnail;
    }

    breadcrumb = (
      <div className="mx-6 mb-8 lg:mx-24 lg:grid lg:grid-cols-2">
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
      </div>
    );

    const items = [
      {
        heading: "DETAILS",
        content: product.description,
      },
      {
        heading: "SIZE",
        content: product.size,
      },
    ];

    const info = (
      <div className="w-[24rem] mx-auto">
        <div className="flex justify-between">
          <h1 className="text-lg">{product.title}</h1>
          <Icons.Collection
            className={`cursor-pointer stroke-[5rem] ${collectionIndex >= 0 ? "fill-primary stroke-transparent" : "fill-white stroke-primary"}`}
            onClick={() => handleCollection()}
          />
        </div>
        <div className="mt-3.5">
          <span>NT$ {product.price.toLocaleString()}</span>
        </div>
        {product.stock < 5 && product.stock !== 0 && (
          <div>
            <span className="text-sm label-neutral">剩餘庫存 {product.stock}</span>
          </div>
        )}
        {/* <p className="mt-3.5">{product.description}</p> */}
        {product.stock === 0 ? (
          <Button className="cursor-not-allowed w-button mt-4 tracking-wider">Sold Out</Button>
        ) : (
          <Button primary transition className="w-button mt-7.5" onClick={() => handleAddToCart({ ...product, thumbnailURL })}>
            Add To Cart
          </Button>
        )}
        <Accordion items={items} className="rounded mt-12 tracking-wider text-sm w-full" />
      </div>
    );

    content = (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-14 items-start lg:mx-24 lg:min-h-[60vh]">
        <Silder items={product.images} />
        {info}
      </div>
    );
  }

  return (
    <div className="container m-auto">
      {breadcrumb}
      {content}
      {modal}
    </div>
  );
};

export default Product;
