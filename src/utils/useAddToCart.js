import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import Modal from "../components/Modal";
import Button from "../components/Button";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    handleModalOpen();
    // navigate("/cart");
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
    // setTimeout(() => setIsOpen(false), 1000);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const actionBar = (
    <div className="mt-5">
      <Button tertiary className="rounded-md px-4.5 py-1.5 w-[9.7rem]" onClick={() => navigate("/cart")}>
        Checkout
      </Button>
    </div>
  );

  const modal = isOpen && (
    <Modal onClose={handleModalClose} actionBar={actionBar} className="min-w-fit rounded-lg px-8 py-8 bg-white">
      <p className="text-lg">Added To Cart</p>
    </Modal>
  );

  return { modal, handleAddToCart };
};

export default useAddToCart;
