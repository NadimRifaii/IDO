import { useEffect } from "react"
import { extractUserSlice, setUser } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { useDispatch, useSelector } from "react-redux"
const useLogic = () => {
  const dispatch = useDispatch()
  const user = useSelector(extractUserSlice)
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      const user = JSON.parse(localStorage.getItem("currentUser") || '')
      dispatch(setUser(user))
    }
  }, [])
  return { user }
}
export default useLogic 