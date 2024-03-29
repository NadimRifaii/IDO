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
      const { currentUser: user } = response
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error: any) {
      throw new Error(error)
    }
  },
  login: async (data: { credentials: {} }) => {
    try {
      const response = await sendRequest({
        route: "Auth/login",
        method: "POST",
        data: data.credentials
      })
      localStorage.setItem('token', response.token)
      const { currentUser: user } = response
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }
}