import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:8080/",
  }),
  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (arg) => {
          return {
            url: "/auth/login",
            credentials: "include",
            method: "POST",
            body: arg,
          };
        },
      }),
      logoutUser: builder.mutation({
        query: () => {
          return {
            url: "/auth/logout",
            method: "POST",
          };
        },
      }),
      createUser: builder.mutation({
        query: (arg) => {
          return {
            url: "/auth/signup",
            method: "POST",
            body: arg,
          };
        },
      }),
    };
  },
});

export const { useLoginUserMutation, useCreateUserMutation, useLogoutUserMutation } = authApi;
export { authApi };

// const [loginUser, results] = useLoginUserMutation(); // loginUser({ email, password })
// const [logoutUser, results] = useLogoutUserMutation(); // logoutUser()
// const [createUser, results] = useCreateUserMutation(); // createUser({ email, password, name, phone })
