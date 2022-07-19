import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  available: false,
  id: null,
  title: "",
  status: "draft",
  description: "",
  createdAt: 0,
  updatedAt: 0,
  tasks: [],
  userId: "",
  maxPoints: 0,
};

const editedTaskListSlice = createSlice({
  name: "editedTaskList",
  initialState,
  reducers: {
    setAvailable: (state, { payload: { available } }) => {
      state.available = available;
    },
    setUpdateParams: (state, { payload: { taskList } }) => {
      state.available = true;
      state.id = taskList.id;
      state.title = taskList.title;
      state.status = taskList.status;
      state.description = taskList.description;
      state.createdAt = taskList.createdAt;
      state.updatedAt = taskList.updatedAt;
      state.tasks = taskList.tasks;
      state.userId = taskList.userId;
      state.maxPoints = 0;
      taskList.tasks.map((task) => (state.maxPoints += task.points));
    },
    addTask: (state, { payload: { task } }) => {
      task = { ...task, notes: "", points: 0 };
      state.tasks.push(task);
    },
    closeEdit: (state) => {
      state.available = initialState.available;
      state.id = initialState.id;
      state.title = initialState.title;
      state.status = initialState.status;
      state.description = initialState.description;
      state.createdAt = initialState.createdAt;
      state.updatedAt = initialState.updatedAt;
      state.tasks = initialState.tasks;
      state.userId = initialState.userId;
      state.maxPoints = initialState.maxPoints;
    },
    saveCreated: (state, { payload: { taskList } }) => {
      console.log(taskList);
      state.id = taskList.id;
      state.title = taskList.title;
      state.status = taskList.status;
      state.description = taskList.description;
      state.createdAt = taskList.createdAt;
      state.updatedAt = taskList.updatedAt;
      state.tasks = taskList.tasks;
      state.userId = taskList.userId;
    },
  },
});

export const {
  setAvailable,
  setUpdateParams,
  addTask,
  closeEdit,
  saveCreated,
} = editedTaskListSlice.actions;

export default editedTaskListSlice.reducer;

export const selectEditedTaskListAvailability = (state) =>
  state.editedTaskList.available;

export const selectTaskList = (state) => state.editedTaskList;

export const selectTaskListTasks = (state) => state.editedTaskList.tasks;
