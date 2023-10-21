import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./apis/productsApi";
import { cartReducer } from "./slices/cartSlice";
// import { productsReducer, fetchProducts } from "./slices/productsSlice"; //

// 透過 configureStore() 建立 Redux Store
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    // products: productsReducer, //
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

// store.dispatch(fetchProducts()); //
setupListeners(store.dispatch);

export { useGetAllProductsQuery, useGetProductsQuery } from "./apis/productsApi";
export { addToCart, updateQuantity, removeItem } from "./slices/cartSlice";
