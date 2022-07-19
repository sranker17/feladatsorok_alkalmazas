import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const taskApiSlice = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({ url: "tasks?$limit=50" }),
      transformResponse: (response) => response.data,
    }),
    getTask: builder.query({
      query: (id) => ({ url: `tasks/${id}` }),
      transformResponse: (response) => response,
    }),
    getTasksInRange: builder.query({
      query: ({ skip, limit }) => ({
        url: `tasks/?$skip=${skip}&$limit=${limit}`,
      }),
      transformResponse: (response) => response.data,
    }),
    createTask: builder.mutation({
      query: (body) => {
        return {
          url: "tasks",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useGetTasksInRangeQuery,
  useCreateTaskMutation,
} = taskApiSlice;

export default taskApiSlice;
