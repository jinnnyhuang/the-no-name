import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../store";
import Modal from "../components/Modal";
import Button from "../components/Button";

const useAddToCart = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const currentUser = localStorage.getItem("userInfo");
  const [addToCart, results] = useAddToCartMutation(); // addToCart(_id) // productId

  useEffect(() => {
    results?.data?.message && setMessage(results?.data?.message);
    results.status === "fulfilled" && setIsOpen(true);
  }, [results]);

  const handleAddToCart = (product) => {
    currentUser ? addToCart(product._id) : setIsOpen(true);
  };

  // Modal
  const handleClick = () => {
    !currentUser || message ? setIsOpen(false) : navigate("/cart");
  };
  const actionButton = (
    <Button
      tertiary={!(!currentUser || message)}
      secondary={!currentUser || message}
      transition={!currentUser || message}
      className="action-button w-[9.7rem]"
      onClick={handleClick}
    >
      {!currentUser || message ? "OK" : "Checkout"}
    </Button>
  );
  const modal = isOpen && (
    <Modal onClose={() => setIsOpen(false)} actionButton={actionButton} className="modal">
      <p className="text-lg">{!currentUser ? "Please log in first" : message ? message : "Added To Cart"}</p>
    </Modal>
  );

  return { modal, handleAddToCart };
};

export default useAddToCart;
