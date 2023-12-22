import { useSelector, useDispatch } from "react-redux";
import { useFetchCollectionQuery, useAddToCollectionMutation, useRemoveCollectionMutation, openModal } from "../store";

const useCollection = (product) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [addToCollection] = useAddToCollectionMutation(); // addToCollection(product)
  const [removeCollection] = useRemoveCollectionMutation(); // removeCollection(product)
  const { currentData, data, error, isFetching } = useFetchCollectionQuery(undefined, { skip: !userInfo });
  const collectionItems = userInfo && !error ? (isFetching ? currentData || [] : data) : [];

  if (!product) return { collectionItems };

  const collectionIndex = collectionItems?.findIndex((item) => item._id === product._id);
  const handleAddCollection = () => {
    userInfo ? addToCollection(product) : dispatch(openModal({ title: "請先登入" }));
  };
  const handleRemoveCollection = () => {
    removeCollection(product);
  };
  const handleCollection = () => {
    collectionIndex >= 0 ? handleRemoveCollection(product) : handleAddCollection(product);
  };

  return { collectionItems, collectionIndex, handleCollection, handleRemoveCollection };
};

export default useCollection;
