import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../types/rootState";
import { Task } from "../../../types/task";

export type taskSlice = {
  tasks: Task[],
  todoTasks?: Task[],
  doingTasks?: Task[],
  doneTasks?: Task[]
}
const initialState: taskSlice = {
  tasks: [],
  todoTasks: [],
  doingTasks: [],
  doneTasks: []
}

export const tasksSlice = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    setTasks(prevState, { type, payload }: { type: string, payload: taskSlice }) {
      if (prevState && type) {

      }
      return {
        ...prevState,
        ...payload
      }
    },
    removeTasks(prevState, { type, payload }: { type: string, payload: taskSlice }) {
      if (type && prevState && payload) {

      }
      return {
        ...payload
      }
    }
  }
})
export const { setTasks, removeTasks } = tasksSlice.actions
export const tasks = tasksSlice.name
export default tasksSlice.reducer
export const extractTasksSlice = (global: RootState) => {
  return global[tasks]
}