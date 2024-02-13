import { sendRequest } from "../../helpers/request";

export const authDataSource = {
  signup: async (data: { credentials: {} }) => {
    console.log(data)
    try {
      const response = await sendRequest({
        route: "Auth/signup",
        method: "POST",
        data: data.credentials
      })
      localStorage.setItem('token', response.token)
    } catch (error: any) {
      throw new Error(error)
    }
  },
  login: async (data: {}) => {
    try {
      const response = await sendRequest({
        route: "Auth/login",
        method: "POST",
        data
      })
      localStorage.setItem('token', response.token)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}