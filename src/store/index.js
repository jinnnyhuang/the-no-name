import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./apis/productsApi";
import { cartApi } from "./apis/cartApi";
import { collectionApi } from "./apis/collectionApi";

// 透過 configureStore() 建立 Redux Store
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware).concat(cartApi.middleware).concat(collectionApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useGetAllProductsQuery, useGetProductsQuery, useGetProductByIdQuery } from "./apis/productsApi";
export { useFetchCartQuery, useAddToCartMutation, useUpdateQuantityMutation, useRemoveItemMutation } from "./apis/cartApi";
export { useFetchCollectionQuery, useAddToCollectionMutation, useRemoveCollectionMutation } from "./apis/collectionApi";
