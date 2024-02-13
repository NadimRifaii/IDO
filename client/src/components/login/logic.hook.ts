import React, { useState } from "react"
import { authDataSource } from "../../core/dataSource/remoteDataSource/authDataSource"
import toast from "react-hot-toast"

const defaultCredentials: {
  email: string,
  password: string
} = {
  email: "",
  password: ""
}
const useLogic = () => {
  const [credentials, setCredentials] = useState(defaultCredentials)
  const login = async () => {
    const loadingToastId = toast.loading('Signing up...');
    try {
      await authDataSource.login({ credentials })
      toast.success('Signup successful!', { id: loadingToastId });
      setCredentials({ ...defaultCredentials })
    } catch (error: any) {
      toast.error(`Something went wrong`, { id: loadingToastId });
    }
  }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return { credentials, setCredentials, login, changeHandler }
}
export default useLogic 