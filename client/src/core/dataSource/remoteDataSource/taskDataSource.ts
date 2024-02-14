import { sendRequest } from "../../helpers/request";

export const taskDataSource = {
  getUserTasks: async (data: {}) => {
    try {
      const response = await sendRequest({
        route: "Task",
        method: "GET",
        data
      })
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  }
}