import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3001/",
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
      }),
    };
  },
});

export const { useGetAllProductsQuery, useGetProductsQuery } = productsApi;
export { productsApi };
