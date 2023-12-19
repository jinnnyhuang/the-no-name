import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../store";
import Modal from "../components/Modal";
import Button from "../components/Button";

const useAddToCart = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [addToCart] = useAddToCartMutation(); // addToCart(_id) // productId

  const handleAddToCart = (product) => {
    if (userInfo) {
      addToCart(product._id)
        .unwrap()
        .then((res) => {
          setIsOpen(true);
          res?.message && setMessage(res?.message);
        });
    } else {
      setIsOpen(true);
    }
  };

  // Modal
  const handleClick = () => {
    message !== "已加入購物車" ? setIsOpen(false) : navigate("/cart");
  };
  const actionButton = (
    <Button
      tertiary={message === "已加入購物車"}
      secondary={message !== "已加入購物車"}
      transition
      className="action-button w-[9.7rem]"
      onClick={handleClick}
    >
      {message !== "已加入購物車" ? "OK" : "Checkout"}
    </Button>
  );
  const modal = (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} action actionButton={actionButton} className="modal-content">
      <p className="text-lg">{!userInfo ? "請先登入" : message}</p>
    </Modal>
  );

  return { modal, handleAddToCart };
};

export default useAddToCart;
