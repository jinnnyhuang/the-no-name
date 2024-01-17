import { Link } from "react-router-dom";
import Button from "../components/Button";
import Icons from "../components/Icons";
import useCollection from "../utils/useCollection";
import useMediaQuery from "../utils/useMediaQuery";

const Products = ({ product, handleAddToCart }) => {
  const { collectionIndex, handleCollection, handleRemoveCollection } = useCollection(product);
  const hover = useMediaQuery("(hover: hover) and (min-width: 640px) and (pointer: fine)") && product.images.length > 1;
  const inStock = product.stock !== 0;
  const discount = product.discountPercentage;

  const content = (
    <>
      {!handleAddToCart ? (
        <div className="item-images">
          <Link to={`/products/${product._id}`} className="block">
            <div className="group overflow-hidden relative bg-neutral-100">
              <img
                className={hover ? "group-hover:opacity-0 transition-opacity duration-300 ease-in-out absolute" : ""}
                src={product.images[0].medium}
                srcSet={`${product.images[0].large} 1000w, ${product.images[0].medium} 750w, ${product.images[0].small} 500w`}
                // grid-cols-2 lg:grid-cols-4 + container max-width = 1536px
                sizes="(min-width: 1024px) 330px, 50vw"
                alt={product.title}
                width="750px"
                height="750px"
              />
              {hover && (
                <img
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                  src={product.images[1].medium}
                  srcSet={`${product.images[1].large} 1000w, ${product.images[1].medium} 750w, ${product.images[1].small} 500w`}
                  // grid-cols-2 lg:grid-cols-4 + container max-width = 1536px
                  sizes="(min-width: 1024px) 330px, 50vw"
                  alt={product.title}
                  width="750px"
                  height="750px"
                />
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className="item-image-wrapper relative group">
          <div className="item-image">
            <Link to={`/products/${product._id}`} className="block">
              <img
                // group hover 或是 group 內有 button 聚焦時改變圖片亮度
                className="group-hover:brightness-[0.6] group-[&:has(button:focus-visible)]:brightness-[0.6] transition"
                src={product.images[0].medium}
                srcSet={`${product.images[0].medium} 750w, ${product.images[0].small} 500w`}
                // Account: page-content-width (w-[88%] lg:w-3/4) + grid-cols-2 lg:grid-cols-3 = 75vw/3 / 88vw /2
                sizes="(min-width: 1024px) 25vw, 44vw"
                alt={product.title}
              />
            </Link>
          </div>
          <button
            className="collection-remove cursor-default opacity-0 fill-white group-hover:opacity-100 hover-none:opacity-100 focus-visible:opacity-100 focus-visible:shadow-none transition-color absolute top-2.5 right-2.5 p-1.5"
            onClick={handleRemoveCollection}
          >
            <Icons.Close className="w-4.5 h-4.5" />
          </button>
        </div>
      )}
      <div className="flex justify-between items-start mt-4">
        <div className="item-info">
          <Link to={`/products/${product._id}`} className="item-name block" tabIndex={-1}>
            {product.title}
          </Link>
          {inStock && (
            <div className="item-price">
              <span className={`original-price inline-block${discount < 100 ? " line-through text-neutral-400" : ""}`}>
                NT$ {product.price.toLocaleString()}
              </span>
              {discount < 100 && <span className="discount-price ml-2">NT$ {(product.price * (discount / 100)).toLocaleString()}</span>}
            </div>
          )}
          {!inStock && <span className="sold-out inline-block text-xs tracking-wider label-neutral font-display">SOLD OUT</span>}
        </div>
        {handleAddToCart ? (
          <Button
            secondary={inStock}
            focus={inStock}
            className={`p-1.5 !rounded-md${!inStock ? " cursor-not-allowed fill-neutral-400" : " border-neutral-600"}`}
            onClick={() => inStock && handleAddToCart(product)}
            tabIndex={inStock ? "0" : "-1"}
          >
            <Icons.Cart className="h-6" />
          </Button>
        ) : (
          <button onClick={handleCollection} className="collection !rounded">
            <Icons.Collection
              className={`cursor-pointer stroke-[5rem] shrink-0 transition-colors${
                collectionIndex >= 0 ? " fill-primary stroke-transparent" : " fill-white stroke-primary"
              }`}
            />
          </button>
        )}
      </div>
    </>
  );
  return <div className="item">{content}</div>;
};

export default Products;
