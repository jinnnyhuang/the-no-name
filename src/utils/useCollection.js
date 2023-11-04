import { useDispatch, useSelector } from "react-redux";
import { addCollection, removeCollection } from "../store";

const useCollection = (product) => {
  const dispatch = useDispatch();
  const collectionItems = useSelector((state) => state.collection.collectionItems);
  const collectionIndex = collectionItems.findIndex((item) => item.id === product.id);

  const handleAddCollection = () => {
    dispatch(addCollection(product));
  };
  const handleRemoveCollection = () => {
    dispatch(removeCollection(product));
  };
  const handleCollection = () => {
    collectionIndex >= 0 ? handleRemoveCollection(product) : handleAddCollection(product);
  };
  return { collectionIndex, handleCollection, handleRemoveCollection };
};

export default useCollection;
