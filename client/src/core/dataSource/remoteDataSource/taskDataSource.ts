import { sendRequest } from "../../helpers/request";
import { Task } from "../../types/task";

export const taskDataSource = {
  getUserTasks: async (data: {}) => {
    try {
      const response: { tasks: Task[] } = await sendRequest({
        route: "Task",
        method: "GET",
        data
      })
      const { tasks } = response
      const todoTasks: Task[] = [], doingTasks: Task[] = [], doneTasks: Task[] = []
      for (let task of tasks) {
        switch (task.status) {
          case 0:
            todoTasks.push(task)
            break
          case 1:
            doingTasks.unshift(task)
            break
          case 2:
            doneTasks.unshift(task)
            break
          default:
            break
        }
      }
      return { tasks, todoTasks, doingTasks, doneTasks }
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  },
  createTask: async (data: { defaultTaskObject: Task }) => {
    try {
      const response = await sendRequest({
        route: "Task/createTask",
        method: "POST",
        data: data.defaultTaskObject
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  updateTask: async (data: { task: Task }) => {
    try {
      const response = await sendRequest({
        route: "Task/updateTask",
        method: "PUT",
        data: data.task
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}