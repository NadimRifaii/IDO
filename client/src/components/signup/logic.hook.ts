import React, { useState } from "react"
import { authDataSource } from "../../core/dataSource/remoteDataSource/authDataSource"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { UseDispatch, useDispatch } from "react-redux"
import { setUser } from "../../core/dataSource/localDataSource/userSlice/userSlice"

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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signup = async () => {
    const loadingToastId = toast.loading('Signing up...');
    console.log("Clicked")
    try {
      const response = await authDataSource.signup({ credentials })
      setCredentials({ ...defaultCredentials })
      toast.success('Signup successful!', { id: loadingToastId });
      dispatch(setUser(response))
      navigate('/home')
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