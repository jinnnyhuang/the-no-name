import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:8080/",
  }),
  endpoints(builder) {
    return {
      //
      getAllProducts: builder.query({
        query: () => "/products",
      }),
      getProducts: builder.query({
        query: (arg) => {
          return {
            url: "/products",
            method: "GET",
            params: { ...arg },
          };
        },
        transformResponse: (response, meta) => {
          // return response;
          const total = meta.response.headers.get("X-Total-Count");
          return { products: response, total: +total };
        },
      }),
      getProductById: builder.query({
        query: (id) => {
          return {
            url: `/products/${id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetAllProductsQuery, useGetProductsQuery, useGetProductByIdQuery } = productsApi;
export { productsApi };
