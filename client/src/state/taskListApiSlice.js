import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const taskListApiSlice = createApi({
  reducerPath: "taskListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTaskLists: builder.query({
      query: () => ({ url: `tasklists?$limit=50` }),
      transformResponse: (response) => response.data,
    }),
    createTaskList: builder.mutation({
      query: (body) => {
        return {
          url: "tasklists",
          method: "POST",
          body,
        };
      },
    }),
    updateTaskList: builder.mutation({
      query: (body) => {
        return {
          url: `tasklists/${body.id}`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetTaskListsQuery,
  useCreateTaskListMutation,
  useUpdateTaskListMutation,
} = taskListApiSlice;

export default taskListApiSlice;
