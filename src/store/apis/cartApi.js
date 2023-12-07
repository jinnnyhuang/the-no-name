import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:8080/",
    credentials: "include", // 設定 CORS: 發出附帶 Cookie 的 header
  }),
  endpoints(builder) {
    return {
      fetchCart: builder.query({
        providesTags: ["Cart"],
        query: () => {
          return {
            url: "/cart",
            method: "GET",
          };
        },
      }),
      addToCart: builder.mutation({
        invalidatesTags: ["Cart"],
        query: (productId) => {
          return {
            url: "/cart",
            method: "POST",
            body: { productId },
          };
        },
      }),
      updateQuantity: builder.mutation({
        invalidatesTags: ["Cart"],
        query: (arg) => {
          const { item, operation, optionalValue } = arg;

          return {
            url: `/cart/${item._id}`,
            method: "PATCH",
            body: {
              productId: item.productId._id,
              operation,
              value: optionalValue,
            },
          };
        },
      }),
      removeItem: builder.mutation({
        invalidatesTags: ["Cart"],
        query: (cartItem) => {
          return {
            url: `/cart/${cartItem._id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useFetchCartQuery, useAddToCartMutation, useUpdateQuantityMutation, useRemoveItemMutation } = cartApi;
export { cartApi };

// const { data, error, isFetching } = useFetchCartQuery();
// const [addToCart, results] = useAddToCartMutation(); // addToCart(_id) // productId
// const [updateQuantity, results] = useUpdateQuantityMutation(); // updateQuantity(item, operation, value)
// const [removeItem, results] = useRemoveItemMutation(); // removeItem(item)
