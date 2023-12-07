import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:8080/",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      fetchCollection: builder.query({
        providesTags: ["Collection"],
        query: () => {
          return {
            url: "/collection",
            method: "GET",
          };
        },
      }),
      addToCollection: builder.mutation({
        invalidatesTags: ["Collection"],
        query: (product) => {
          return {
            url: "/collection",
            method: "POST",
            body: { productId: product._id },
          };
        },
      }),
      removeCollection: builder.mutation({
        invalidatesTags: ["Collection"],
        query: (product) => {
          return {
            url: `/collection/${product._id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useFetchCollectionQuery, useAddToCollectionMutation, useRemoveCollectionMutation } = collectionApi;
export { collectionApi };

// const { data, error, isFetching } = useFetchCollectionQuery();
// const [addToCollection, results] = useAddToCollectionMutation(); // addToCollection(product)
// const [removeCollection, results] = useRemoveCollectionMutation(); // removeCollection(product)
