import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Table from "../components/Table";
import Counter from "../components/Counter";
import { removeItem, updateQuantity } from "../store";

const Cart = () => {
  useEffect(() => {
    document.title = "Cart | 還沒有名字";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.filter((item) => item.id).reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };
  const handleUpdateQuantity = (item, operation, optional) => {
    dispatch(updateQuantity({ item: item, operation, value: optional }));
  };

  const config = [
    {
      label: "Products",
      render: (item) => (
        <Link to={`/products/${item.id}`}>
          <img src={item.thumbnail} alt={item.title} className="w-[7rem]" />
        </Link>
      ),
      class: "text-left w-[7rem]",
    },
    {
      label: "",
      render: (item) => (
        <div className="pl-6 text-left">
          <p>{item.title}</p>
          <p>NT$ {item.price}</p>
        </div>
      ),
      class: "",
    },
    {
      label: "Quantity",
      render: (item) => (
        <div className="flex flex-col items-center">
          <Counter value={item} onChange={handleUpdateQuantity} />
          <div className="cursor-pointer text-xs mt-3 text-neutral-400 underline-offset-4 hover:underline" onClick={() => handleRemove(item)}>
            Remove
          </div>
        </div>
      ),
      class: "text-center",
    },
    {
      label: "Subtotal",
      render: (item) => <div className="text-right hidden sm:block">NT$ {(item.quantity * item.price).toLocaleString()}</div>,
      class: "text-right hidden sm:table-cell",
    },
  ];
  const keyValue = (item) => item.id;

  const content = (
    <div className="flex flex-col items-center mt-10 sm:mx-24">
      <h2 className="text-2xl tracking-wider mb-14">Your Cart</h2>
      <Table data={cartItems} config={config} keyValue={keyValue} />
      <div className="text-xl sm:text-lg tabel-width mt-7 text-right text-neutral-600">Total Price: NT$ {total.toLocaleString()}</div>
      <div className="tabel-width flex flex-col gap-y-3 mt-7 sm:flex-row sm:justify-between sm:items-center">
        <Button primary className="px-5">
          CheckOut
        </Button>
        <Button secondary className="px-5 sm:order-first" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );

  const empty = (
    <div className="flex flex-col items-center">
      <p className="tracking-wide text-2xl">Your cart is empty</p>
      <Button primary className="w-button mt-7.5 tracking-wide" onClick={() => navigate("/")}>
        {/* 選購產品 */}
        Start Shopping
      </Button>
    </div>
  );

  return <div className="container m-auto">{cartItems.length > 0 ? content : empty}</div>;
};

export default Cart;
