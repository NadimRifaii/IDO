import axios from 'axios'

type SendRequestRequirements = {
  route: string,
  method?: "GET" | "PUT" | "POST",
  data?: {}
}

export const sendRequest = async ({
  route,
  method,
  data
}: SendRequestRequirements) => {
  try {
    const response = await axios.request({
      url: route,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}