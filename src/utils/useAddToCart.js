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
    !userInfo || message ? setIsOpen(false) : navigate("/cart");
  };
  const actionButton = (
    <Button
      tertiary={!(!userInfo || message)}
      secondary={!userInfo || message}
      transition={!userInfo || message}
      className="action-button w-[9.7rem]"
      onClick={handleClick}
    >
      {!userInfo || message ? "OK" : "Checkout"}
    </Button>
  );
  const modal = isOpen && (
    <Modal onClose={() => setIsOpen(false)} action actionButton={actionButton} className="modal">
      <p className="text-lg">{!userInfo ? "Please log in first" : message ? message : "Added To Cart"}</p>
    </Modal>
  );

  return { modal, handleAddToCart };
};

export default useAddToCart;
