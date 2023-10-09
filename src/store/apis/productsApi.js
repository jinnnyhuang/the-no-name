import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints(builder) {
    return {
      //
      getAllProducts: builder.query({
        query: () => "/products",
        // query: () => {
        //   return {
        //     url: "/products",
        //     method: "GET",
        //   };
        // },
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

export const { useGetAllProductsQuery, useGetProductsQuery, useSearchQuery } = productsApi;
export { productsApi };
