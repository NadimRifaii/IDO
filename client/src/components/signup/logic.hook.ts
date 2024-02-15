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
  const [validEmail, setValidEmail] = useState<boolean | null>(null)
  const [validPassword, setValidPassword] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signup = async () => {
    const loadingToastId = toast.loading('Signing up...');
    try {
      if (!validEmail || !validPassword)
        throw new Error("Invalid credentials")
      const response = await authDataSource.signup({ credentials })
      setCredentials({ ...defaultCredentials })
      toast.success('Signup successful!', { id: loadingToastId });
      dispatch(setUser(response))
      navigate('/home')
    } catch (error: any) {
      toast.error(`${error}`, { id: loadingToastId });
    }
  }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  function isValidEmail(email: string) {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setValidEmail(pattern.test(email));
  }
  function isValidPassword(password: string) {
    setValidPassword(password.length > 5)
  }
  return { credentials, validEmail, validPassword, setCredentials, signup, changeHandler, isValidEmail, isValidPassword }
}
export default useLogic 