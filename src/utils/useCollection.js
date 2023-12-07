import { useState } from "react";
import { useFetchCollectionQuery, useAddToCollectionMutation, useRemoveCollectionMutation } from "../store";
import Modal from "../components/Modal";
import Button from "../components/Button";

const useCollection = (product) => {
  const [isOpen, setIsOpen] = useState(false); // Modal
  const currentUser = localStorage.getItem("userInfo");
  const [addToCollection] = useAddToCollectionMutation(); // addToCollection(product)
  const [removeCollection] = useRemoveCollectionMutation(); // removeCollection(product)
  const { currentData, data, error, isFetching } = useFetchCollectionQuery(undefined, { skip: !currentUser });
  const collectionItems = currentUser && !error ? (isFetching ? currentData || [] : data) : [];

  if (!product) return { collectionItems };

  const collectionIndex = collectionItems?.findIndex((item) => item._id === product._id);
  const handleAddCollection = () => {
    currentUser ? addToCollection(product) : setIsOpen(true);
  };
  const handleRemoveCollection = () => {
    removeCollection(product);
  };
  const handleCollection = () => {
    collectionIndex >= 0 ? handleRemoveCollection(product) : handleAddCollection(product);
  };

  // Modal
  const actionButton = (
    <Button secondary transition className="action-button w-[9.7rem]" onClick={() => setIsOpen(false)}>
      OK
    </Button>
  );
  const collectionModal = isOpen && (
    <Modal onClose={() => setIsOpen(false)} actionButton={actionButton} className="modal">
      <p className="text-lg">Please log in first</p>
    </Modal>
  );

  return { collectionItems, collectionModal, collectionIndex, handleCollection, handleRemoveCollection };
};

export default useCollection;
