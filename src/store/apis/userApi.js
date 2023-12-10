import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:8080/",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query({
        providesTags: ["User"],
        query: () => {
          return {
            url: "/user",
            method: "GET",
          };
        },
      }),
      updateUser: builder.mutation({
        invalidatesTags: ["User"],
        query: (arg) => {
          const { id, update } = arg;
          return {
            url: "/user/update/" + id,
            method: "PATCH",
            body: { name: update.name, phone: update.phone },
          };
        },
      }),
    };
  },
});

export const { useFetchUserQuery, useUpdateUserMutation } = userApi;
export { userApi };

// const { data, error, isFetching } = useFetchUserQuery();
// const [updateUser, results] = useUpdateUserMutation(); // updateUser({ id, update })
