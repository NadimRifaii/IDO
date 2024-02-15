import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

const AuthComponent = () => {
  const user = useSelector(extractUserSlice)
  return !user.email ? <Navigate to={'/'} /> : <Outlet />
}
export default AuthComponent