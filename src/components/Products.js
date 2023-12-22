import { Link } from "react-router-dom";
import Button from "../components/Button";
import Icons from "../components/Icons";
import useCollection from "../utils/useCollection";
import useMediaQuery from "../utils/useMediaQuery";

const Products = ({ product, handleAddToCart }) => {
  const { collectionIndex, handleCollection, handleRemoveCollection } = useCollection(product);
  const hover = useMediaQuery("(hover: hover) and (min-width: 640px) and (pointer: fine)") && product.images.length > 1;
  const inStock = product.stock !== 0;
  const content = (
    <div>
      {!handleAddToCart ? (
        <Link to={`/products/${product._id}`} className="block">
          <div className="group overflow-hidden relative">
            <img
              className={hover ? "group-hover:opacity-0 transition-opacity duration-300 ease-in-out absolute" : ""}
              src={product.images[0]}
              alt={product.title}
            />
            {hover && (
              <img
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                src={product.images[1]}
                alt={product.title}
              ></img>
            )}
          </div>
        </Link>
      ) : (
        <div className="relative group">
          <Link to={`/products/${product._id}`} className="block">
            <img
              // group hover 或是 group 內有 button 聚焦時改變圖片亮度
              className="group-hover:brightness-[0.6] group-[&:has(button:focus-visible)]:brightness-[0.6] transition"
              src={product.images[0]}
              alt={product.title}
            />
          </Link>
          <button
            className="cursor-default opacity-0 fill-white group-hover:opacity-100 hover-none:opacity-100 focus-visible:opacity-100 focus-visible:shadow-none transition-color absolute top-2.5 right-2.5 p-1.5"
            onClick={handleRemoveCollection}
          >
            <Icons.Close className="w-4.5 h-4.5" />
          </button>
        </div>
      )}
      <div className="flex justify-between items-start mt-4">
        <div className="info">
          <Link to={`/products/${product._id}`} className="block" tabIndex={-1}>
            {product.title}
          </Link>
          {inStock && <div className="inline-block text-neutral-400">NT$ {product.price.toLocaleString()}</div>}
          {!inStock && <div className="inline-block text-xs tracking-wider label-neutral">SOLD OUT</div>}
        </div>
        {handleAddToCart ? (
          <Button
            secondary={inStock}
            focus={inStock}
            className={`p-1.5 !rounded-md ${!inStock ? "cursor-not-allowed fill-neutral-400" : "border-neutral-600"}`}
            onClick={() => inStock && handleAddToCart(product)}
            tabIndex={inStock ? "0" : "-1"}
          >
            <Icons.Cart className="h-6" />
          </Button>
        ) : (
          <button onClick={handleCollection} className="!rounded">
            <Icons.Collection
              className={`cursor-pointer stroke-[5rem] shrink-0 transition-colors ${
                collectionIndex >= 0 ? "fill-primary stroke-transparent" : "fill-white stroke-primary"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
  return <div>{content}</div>;
};

export default Products;
