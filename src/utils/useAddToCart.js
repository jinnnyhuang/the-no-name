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

  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
    // setTimeout(() => setShowModal(false), 1000);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const actionBar = (
    <div className="mt-3.5">
      <Button secondary rounded className="text-sm px-5" onClick={() => navigate("/cart")}>
        Checkout
      </Button>
    </div>
  );

  const modal = showModal && (
    <Modal onClose={handleModalClose} actionBar={actionBar} className="min-w-fit rounded-md px-12 py-8 bg-white text-black">
      <p className="mt-2">Added To Cart</p>
    </Modal>
  );

  return { modal, handleAddToCart };
};

export default useAddToCart;
