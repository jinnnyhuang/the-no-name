import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFetchCartQuery, useUpdateQuantityMutation, useRemoveItemMutation, openModal } from "../store";
import Button from "../components/Button";
import Table from "../components/Table";
import Counter from "../components/Counter";

const Cart = () => {
  useEffect(() => {
    document.title = "Cart | 還沒有名字";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

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
        <Link to={`/products/${item.productId._id}`} className="block">
          <img src={item.productId.thumbnail} alt={item.productId.title} className="w-[7rem]" />
        </Link>
      ),
      class: "text-left w-[7rem]",
    },
    {
      label: "",
      render: (item) => (
        <div className="pl-3 pr-2 sm:pl-6 text-left">
          <p>{item.productId.title}</p>
          <p>NT$ {item.productId.price}</p>
        </div>
      ),
      class: "",
    },
    {
      label: "數量",
      render: (item) => (
        <div className="flex flex-col items-center">
          <Counter value={item} onChange={handleUpdateQuantity} isLoading={results.isLoading} isUpdated={results.isSuccess && !isFetching} />
          <button className="cursor-pointer text-xs mt-3 text-neutral-400 underline-offset-4 hover:underline" onClick={() => handleRemove(item)}>
            移除
          </button>
        </div>
      ),
      class: "text-center",
    },
    {
      label: "小計",
      render: (item) => (
        <div className="text-right hidden md:block md:min-w-[5rem]">NT$ {(item.quantity * item.productId.price).toLocaleString()}</div>
      ),
      class: "text-right hidden md:table-cell",
    },
  ];

  let content;
  if (error) {
    content = <div>Error Loading Cart.</div>;
  } else {
    const cartItems = isLogin ? (isFetching ? currentData || [] : data) : [];
    if (cartItems?.length > 0) {
      const total = cartItems.filter((item) => item.productId._id).reduce((prev, curr) => prev + curr.productId.price * curr.quantity, 0);
      content = (
        <>
          <h1 className="caption">購物車</h1>
          <Table data={cartItems} config={tableConfig} keyValue={(item) => item._id} />
          <div className="text-xl sm:text-lg caption-content-width mt-7 text-right text-neutral-500">總額: NT$ {total.toLocaleString()}</div>
          <div className="caption-content-width flex flex-col gap-y-3 mt-7 sm:flex-row sm:justify-between sm:items-center">
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
          <p className="tracking-wide text-2xl">購物車內尚無商品</p>
          <Button primary transition className="w-button mt-7.5" onClick={() => navigate("/")}>
            開始選購
          </Button>
        </>
      );
    }
  }

  return (
    <div className="container m-auto">
      <div className="flex flex-col items-center caption-content">{content}</div>
    </div>
  );
};

export default Cart;
