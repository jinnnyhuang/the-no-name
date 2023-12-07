import { Link } from "react-router-dom";
import Button from "../components/Button";
import Icons from "../components/Icons";
import useCollection from "../utils/useCollection";

const Products = ({ product, handleAddToCart }) => {
  const { collectionModal, collectionIndex, handleCollection, handleRemoveCollection } = useCollection(product);
  const hover = product.images.length > 1;
  const content = (
    <div>
      {!handleAddToCart ? (
        <Link to={`/products/${product._id}`}>
          <div className="group overflow-hidden relative">
            <img
              className={`${hover && `group-hover:opacity-0 transition-opacity duration-300 ease-in-out absolute`}`}
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
          <Link to={`/products/${product._id}`}>
            <img className="group-hover:brightness-[0.6] transition" src={product.images[0]} alt={product.title} />
          </Link>
          <div
            className="cursor-pointer hidden group-hover:block hover-none:block transition absolute top-2.5 right-2.5 px-2 text-xl text-white"
            onClick={handleRemoveCollection}
          >
            &times;
          </div>
        </div>
      )}
      <div className="flex justify-between items-start mt-4">
        <div className="info">
          <Link to={`/products/${product._id}`} className="block">
            {product.title}
          </Link>
          {product.stock !== 0 && <div className="inline-block text-neutral-400">NT$ {product.price.toLocaleString()}</div>}
          {product.stock === 0 && <div className="inline-block text-xs tracking-wider label-neutral">SOLD OUT</div>}
        </div>
        {handleAddToCart ? (
          <Button
            primaryReverse={product.stock !== 0}
            className={`p-1.5 rounded-md ${product.stock === 0 ? "cursor-not-allowed fill-neutral-400" : ""}`}
            onClick={() => product.stock !== 0 && handleAddToCart(product)}
          >
            <Icons.Cart className="h-6" />
          </Button>
        ) : (
          <Icons.Collection
            className={`cursor-pointer stroke-[5rem] shrink-0 transition-colors ${
              collectionIndex >= 0 ? "fill-primary stroke-transparent" : "fill-white stroke-primary"
            }`}
            onClick={handleCollection}
          />
        )}
      </div>
    </div>
  );
  return (
    <div>
      {content}
      {collectionModal}
    </div>
  );
};

export default Products;
