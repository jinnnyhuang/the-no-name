import { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchCollectionQuery, useAddToCollectionMutation, useRemoveCollectionMutation } from "../store";
import Modal from "../components/Modal";

const useCollection = (product) => {
  const [isOpen, setIsOpen] = useState(false); // Modal
  const { userInfo } = useSelector((state) => state.auth);
  const [addToCollection] = useAddToCollectionMutation(); // addToCollection(product)
  const [removeCollection] = useRemoveCollectionMutation(); // removeCollection(product)
  const { currentData, data, error, isFetching } = useFetchCollectionQuery(undefined, { skip: !userInfo });
  const collectionItems = userInfo && !error ? (isFetching ? currentData || [] : data) : [];

  if (!product) return { collectionItems };

  const collectionIndex = collectionItems?.findIndex((item) => item._id === product._id);
  const handleAddCollection = () => {
    userInfo ? addToCollection(product) : setIsOpen(true);
  };
  const handleRemoveCollection = () => {
    removeCollection(product);
  };
  const handleCollection = () => {
    collectionIndex >= 0 ? handleRemoveCollection(product) : handleAddCollection(product);
  };

  // Modal
  const modal = isOpen && (
    <Modal onClose={() => setIsOpen(false)} action className="modal">
      <p className="text-lg">請先登入</p>
    </Modal>
  );

  return { collectionItems, modal, collectionIndex, handleCollection, handleRemoveCollection };
};

export default useCollection;
