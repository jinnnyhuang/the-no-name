import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./apis/productsApi";
import { cartApi } from "./apis/cartApi";
import { collectionApi } from "./apis/collectionApi";
import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import authReducer from "./slices/authSlice";

// 透過 configureStore() 建立 Redux Store
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(cartApi.middleware)
      .concat(collectionApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useGetAllProductsQuery, useGetProductsQuery, useGetProductByIdQuery } from "./apis/productsApi";
export { useFetchCartQuery, useAddToCartMutation, useUpdateQuantityMutation, useRemoveItemMutation } from "./apis/cartApi";
export { useFetchCollectionQuery, useAddToCollectionMutation, useRemoveCollectionMutation } from "./apis/collectionApi";
export { useLoginUserMutation, useCreateUserMutation, useLogoutUserMutation } from "./apis/authApi";
export { useFetchUserQuery, useUpdateUserMutation } from "./apis/userApi";
export { setCredentials, logout } from "./slices/authSlice";
