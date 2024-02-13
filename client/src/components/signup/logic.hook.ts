import React, { useState } from "react"
import { authDataSource } from "../../core/dataSource/remoteDataSource/authDataSource"
import toast from "react-hot-toast"
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
    const loadingToastId = toast.loading('Signing up...');
    console.log("Clicked")
    try {
      await authDataSource.signup({ credentials })
      setCredentials({ ...defaultCredentials })
      toast.success('Signup successful!', { id: loadingToastId });
    } catch (error: any) {
      toast.error(`Something went wrong`, { id: loadingToastId });
    }
  }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return { credentials, setCredentials, signup, changeHandler }
}
export default useLogic 