import { useEffect, useState } from "react"
import { extractUserSlice, setUser } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { extractTasksSlice, setTasks } from "../../core/dataSource/localDataSource/tasksSlice/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import { taskDataSource } from "../../core/dataSource/remoteDataSource/taskDataSource"
import toast from "react-hot-toast"
const useLogic = () => {
  const dispatch = useDispatch()
  const user = useSelector(extractUserSlice)
  const { tasks, todoTasks } = useSelector(extractTasksSlice)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user") || '')
      dispatch(setUser(user))
      getUserTasks()
    }
  }, [])
  const getUserTasks = async () => {
    const loadingToastId = toast.loading('Fetching user tasks...');
    try {
      const response = await taskDataSource.getUserTasks({})
      dispatch(setTasks(response))
      toast.success('Tasks fetched!', { id: loadingToastId });
    } catch (error: any) {
      toast.error(`Something went wrong`, { id: loadingToastId });
    }
  }
  return { user, tasks, todoTasks }
}
export default useLogic 