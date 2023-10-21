import { Link } from "react-router-dom";

const Products = ({ data, error, isFetching }) => {
  let content;

  if (error) {
    content = <div>Error Loading Products.</div>;
  } else if (!isFetching) {
    content = data.map((product) => {
      const hover = product.images.length > 1;

      return (
        <Link to={`/products/${product.id}`} key={product.id}>
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
          <div className="info">
            <h3 className="mt-4">{product.title}</h3>
            {product.stock !== 0 && <div className="text-neutral-400">NT$ {product.price.toLocaleString()}</div>}
            {product.stock === 0 && <span className="text-xs tracking-wider label-neutral">SOLD OUT</span>}
          </div>
        </Link>
      );
    });
  }

  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-16 justify-items-center mx-5 lg:mx-24">{content}</div>;
};

export default Products;
