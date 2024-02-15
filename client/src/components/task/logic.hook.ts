import { useEffect, useState } from "react"
import { Task } from "../../core/types/task"
import { taskDataSource } from "../../core/dataSource/remoteDataSource/taskDataSource"
import { setTasks } from "../../core/dataSource/localDataSource/tasksSlice/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import { extractQuerySlice } from "../../core/dataSource/localDataSource/currentQuery/querySlice"


const useLogic = (task: Task) => {
  const [credentials, setCredentials] = useState<Task>(task)
  const dispatch = useDispatch()
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const onBlur = () => {
    updateTask()
  }
  const updateTask = async () => {
    try {
      let response = await taskDataSource.updateTask({ task: credentials })
      response = await taskDataSource.getUserTasks({})
      dispatch(setTasks(response))
    } catch (error: any) {
    }
  }
  return { credentials, changeHandler, updateTask, dispatch, setTasks, setCredentials }
}
export default useLogic 