import { sendRequest } from "../../helpers/request";

export const authDataSource = {
  signup: async (data: {}) => {
    try {
      const response = await sendRequest({
        route: "api/signup",
        method: "POST",
        data
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  login: async (data: {}) => {
    try {
      const response = await sendRequest({
        route: "api/login",
        method: "POST",
        data
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}