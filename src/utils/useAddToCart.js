import { useSelector, useDispatch } from "react-redux";
import { useAddToCartMutation, openModal } from "../store";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const [addToCart] = useAddToCartMutation(); // addToCart(_id) // productId

  const handleAddToCart = (product) => {
    if (isLogin) {
      addToCart(product._id)
        .unwrap()
        // res.code = 200 = 已加入購物車
        .then((res) => res?.message && dispatch(openModal({ title: res?.message, actionButton: res.code === 200 ? "Checkout" : undefined })));
    } else {
      dispatch(openModal({ title: "請先登入" }));
    }
  };

  return { handleAddToCart };
};

export default useAddToCart;
