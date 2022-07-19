import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";
import editedTaskListSlice from "./editedTaskListSlice";
import taskApiSlice from "./taskApiSlice";
import taskListApiSlice from "./taskListApiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    editedTaskList: editedTaskListSlice,
    authApi: authApiSlice.reducer,
    taskApi: taskApiSlice.reducer,
    taskListApi: taskListApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      taskApiSlice.middleware,
      taskListApiSlice.middleware
    ),
});
