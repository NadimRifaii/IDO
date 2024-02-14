import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../types/rootState";
import { Task } from "../../../types/task";

type taskSlice = {
  tasks: Task[]
}
const initialState: taskSlice = {
  tasks: []
}

export const tasksSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setTasks(prevState, { type, payload }: { type: string, payload: Task[] }) {
      if (prevState && type) {

      }
      return {
        tasks: payload
      }
    },
    removeTasks(prevState, { type, payload }: { type: string, payload: Task[] }) {
      if (type && prevState && payload) {

      }
      return {
        tasks: []
      }
    }
  }
})
export const { setTasks, removeTasks } = tasksSlice.actions
export const tasks = tasksSlice.name
export default tasksSlice.reducer
export const extractUserSlice = (global: RootState) => {
  return global[tasks]
}