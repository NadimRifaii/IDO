import React, { useState } from "react"
import { authDataSource } from "../../core/dataSource/remoteDataSource/authDataSource"

const defaultCredentials: {
  userName: string,
  email: string,
  password: string
} = {
  userName: "",
  email: "",
  password: ""
}
const useLogic = () => {
  const [credentials, setCredentials] = useState(defaultCredentials)
  const signup = async () => {
    try {
      await authDataSource.signup({ credentials })
      setCredentials({ ...defaultCredentials })
    } catch (error: any) {
      console.log(error)
    }
  }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return { credentials, setCredentials, signup, changeHandler }
}
export default useLogic 