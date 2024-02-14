import React, { useState } from "react"
import { authDataSource } from "../../core/dataSource/remoteDataSource/authDataSource"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../../core/dataSource/localDataSource/userSlice/userSlice"
const defaultCredentials: {
  email: string,
  password: string
} = {
  email: "",
  password: ""
}
const useLogic = () => {
  const [credentials, setCredentials] = useState(defaultCredentials)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = async () => {
    const loadingToastId = toast.loading('Loging in...');
    try {
      const response = await authDataSource.login({ credentials })
      toast.success('Login successful!', { id: loadingToastId });
      setCredentials({ ...defaultCredentials })
      dispatch(setUser(response))
      navigate('/home')
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