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
            doingTasks.push(task)
            break
          case 2:
            doneTasks.push(task)
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
  }
}