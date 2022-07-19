import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => {
        return {
          url: "users",
          method: "POST",
          body,
        };
      },
    }),
    login: builder.mutation({
      query: (body) => {
        return {
          url: "authentication",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;

export default authApiSlice;
