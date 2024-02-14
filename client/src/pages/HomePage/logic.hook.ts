import { useEffect, useState } from "react"
import { extractUserSlice, setUser } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { extractTasksSlice, setTasks } from "../../core/dataSource/localDataSource/tasksSlice/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import { taskDataSource } from "../../core/dataSource/remoteDataSource/taskDataSource"
import toast from "react-hot-toast"
const useLogic = () => {
  const dispatch = useDispatch()
  const user = useSelector(extractUserSlice)
  const { tasks, todoTasks, doingTasks, doneTasks } = useSelector(extractTasksSlice)

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
  const createTask = async () => {
    const loadingToastId = toast.loading('Creating task...');
    const defaultTaskObject = {
      "taskId": 0,
      "title": "string",
      "category": "string",
      "dueDate": "2024-02-13T14:30:25.372Z",
      "estimate": "string",
      "importance": 0,
      "status": 0,
      "userId": "string"
    }
    try {
      const response = await taskDataSource.createTask({ defaultTaskObject })
      dispatch(setTasks(response))
      toast.success('Task created!', { id: loadingToastId });
      getUserTasks()
    } catch (error: any) {
      toast.error(`Something went wrong`, { id: loadingToastId });
    }
  }
  const formatDateString = (date: Date) => {
    let year = date.getUTCFullYear();
    let month = String(date.getUTCMonth() + 1).padStart(2, '0');
    let day = String(date.getUTCDate()).padStart(2, '0');
    let hours = String(date.getUTCHours()).padStart(2, '0');
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    return formattedDate;
  }
  return { user, tasks, todoTasks, doneTasks, doingTasks, createTask }
}
export default useLogic 