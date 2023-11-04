import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./apis/productsApi";
import { cartReducer } from "./slices/cartSlice";
import { collectionReducer } from "./slices/collectionSlice";

// 透過 configureStore() 建立 Redux Store
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    collection: collectionReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useGetAllProductsQuery, useGetProductsQuery } from "./apis/productsApi";
export { addToCart, updateQuantity, removeItem } from "./slices/cartSlice";
export { addCollection, removeCollection } from "./slices/collectionSlice";
