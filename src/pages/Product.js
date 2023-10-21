import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, useGetProductsQuery } from "../store";
import Button from "../components/Button";
import Accordion from "../components/Accordion";
import Silder from "../components/Slider";
import Modal from "../components/Modal";
import Icons from "../components/Icons";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isFetching } = useGetProductsQuery({ id });

  const dispatch = useDispatch();

  const handleClick = (product) => {
    dispatch(addToCart(product));
    handleModalOpen();
    // navigate("/cart");
  };

  ////// Modal
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
    // setTimeout(() => setShowModal(false), 1000);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const actionBar = (
    <div className="mt-3.5">
      <Button secondary rounded className="text-sm px-5" onClick={() => navigate("/cart")}>
        Checkout
      </Button>
    </div>
  );

  const modal = (
    <Modal onClose={handleModalClose} actionBar={actionBar} className="min-w-fit rounded-md px-12 py-8 bg-white text-black">
      <p className="mt-2">Added To Cart</p>
    </Modal>
  );

  ////// content
  let content;
  let breadcrumb;
  if (error) {
    content = <div className="text-center">Error Loading Product.</div>;
  } else if (!isFetching) {
    const product = data[0];
    document.title = `${product.title} | 還沒有名字`;

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
          <span className="text-neutral-700 truncate">{product.title}</span>
        </div>
      </div>
    );

    const items = [
      {
        heading: "Detail",
        content: product.description,
      },
      {
        heading: "Size",
        content: product.size,
      },
    ];

    const info = (
      <div className="w-[24rem] mx-auto">
        <h1 className="text-lg">{product.title}</h1>
        <div className="mt-3.5">
          <span>NT$ {product.price.toLocaleString()}</span>
        </div>
        {product.stock < 5 && product.stock !== 0 && <span className="text-sm label-neutral">剩餘庫存 {product.stock} 個</span>}
        <p className="mt-3.5">{product.description}</p>
        {product.stock === 0 ? (
          <Button className="cursor-not-allowed w-button mt-4 tracking-wider">Sold Out</Button>
        ) : (
          <Button primary className="w-button mt-7.5" onClick={() => handleClick({ ...product, thumbnailURL })}>
            Add To Cart
          </Button>
        )}
        <Accordion items={items} className="rounded mt-12 uppercase tracking-wider text-sm w-full" />
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
      {showModal && modal}
    </div>
  );
};

export default Product;
