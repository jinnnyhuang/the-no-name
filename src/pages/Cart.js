import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFetchCartQuery, useUpdateQuantityMutation, useRemoveItemMutation, openModal } from "../store";
import Button from "../components/Button";
import Table from "../components/Table";
import Counter from "../components/Counter";
import ErrorLoading from "../components/ErrorLoading";

const Cart = () => {
  useEffect(() => {
    document.title = "Cart | 還沒有名字";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    !isLogin && navigate("/login");
  }, [isLogin, navigate]);

  const { currentData, data, error, isFetching } = useFetchCartQuery(undefined, { skip: !isLogin });
  const [updateQuantity, results] = useUpdateQuantityMutation(); // updateQuantity(item, operation, value)
  const [removeItem] = useRemoveItemMutation(); // removeItem(item)

  const handleRemove = (item) => {
    removeItem(item);
  };
  const handleUpdateQuantity = (item, operation, optionalValue) => {
    updateQuantity({ item, operation, optionalValue })
      .unwrap()
      .then((res) => {
        if (res?.message) {
          dispatch(openModal({ title: res?.message }));
        }
      });
  };

  const tableConfig = [
    {
      label: "產品",
      render: (item) => (
        <div className="cartItem-image">
          <Link to={`/products/${item.productId._id}`} className="block">
            <img
              src={item.productId.thumbnail}
              srcSet={`${item.productId.images[0].small} 500w, ${item.productId.thumbnail} 156w`}
              sizes="98px"
              alt={item.productId.title}
              className="w-[7rem] h-[7rem]"
              loading="lazy"
            />
          </Link>
        </div>
      ),
      class: "text-left w-[7rem]",
    },
    {
      label: "",
      render: (item) => (
        <div className="cartItem-info pl-3 pr-2 sm:pl-6 text-left">
          <h2 className="cartItem-name">{item.productId.title}</h2>
          <div className="cartItem-price">
            <span className={`original-price${item.productId.discountPercentage < 100 ? " line-through text-neutral-300" : ""}`}>
              NT$ {item.productId.price.toLocaleString()}
            </span>
            {item.productId.discountPercentage < 100 && (
              <span className="discount-price ml-2">NT$ {(item.productId.price * (item.productId.discountPercentage / 100)).toLocaleString()}</span>
            )}
          </div>
        </div>
      ),
      class: "",
    },
    {
      label: "數量",
      render: (item) => (
        <div className="cartItem-quantity flex flex-col items-center">
          <Counter value={item} onChange={handleUpdateQuantity} isLoading={results.isLoading} isUpdated={results.isSuccess && !isFetching} />
          <button
            className="cartItem-remove cursor-pointer text-xs mt-3 text-neutral-400 underline-offset-4 hover:underline"
            onClick={() => handleRemove(item)}
          >
            移除
          </button>
        </div>
      ),
      class: "text-center",
    },
    {
      label: "小計",
      render: (item) => (
        <div className="cartItem-subtotal text-right hidden md:block md:min-w-[5rem]">
          NT$ {(item.quantity * (item.productId.price * (item.productId.discountPercentage / 100))).toLocaleString()}
        </div>
      ),
      class: "text-right hidden md:table-cell",
    },
  ];

  let content;
  if (error) {
    content = <ErrorLoading data="購物車" />;
  } else {
    const cartItems = isLogin ? (isFetching ? currentData || [] : data) : [];
    if (cartItems?.length > 0) {
      const total = cartItems
        .filter((item) => item.productId._id)
        .reduce((prev, curr) => prev + curr.productId.price * (curr.productId.discountPercentage / 100) * curr.quantity, 0);
      content = (
        <>
          <h1 className="page-title">購物車</h1>
          <Table data={cartItems} config={tableConfig} keyValue={(item) => item._id} className="cartItems" />
          <p className="cart-total w-full text-xl sm:text-lg mt-7 text-right text-neutral-500">總額: NT$ {total.toLocaleString()}</p>
          <div className="cart-buttons w-full flex flex-col gap-y-3 mt-7 sm:flex-row sm:justify-between sm:items-center">
            <Button primary transition className="px-5">
              前往結帳
            </Button>
            <Button secondary className="px-5 sm:order-first" onClick={() => navigate("/")}>
              繼續選購
            </Button>
          </div>
        </>
      );
    } else {
      content = (
        <>
          <p className="tracking-wide text-2xl">購物車目前尚無商品</p>
          <Button primary transition rounded className="w-button mt-7.5" onClick={() => navigate("/")}>
            開始選購
          </Button>
        </>
      );
    }
  }

  return (
    <main className="container m-auto">
      <div className="page-content page-content-width mx-auto flex flex-col items-center">{content}</div>
    </main>
  );
};

export default Cart;
