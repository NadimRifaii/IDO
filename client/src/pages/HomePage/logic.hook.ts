import { useEffect, useState } from "react"
import { extractUserSlice, setUser } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { extractTasksSlice, setTasks } from "../../core/dataSource/localDataSource/tasksSlice/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import { taskDataSource } from "../../core/dataSource/remoteDataSource/taskDataSource"
import toast from "react-hot-toast"
import { Task } from "../../core/types/task"
const useLogic = () => {
  const dispatch = useDispatch()
  const user = useSelector(extractUserSlice)
  const { tasks, todoTasks, doingTasks, doneTasks } = useSelector(extractTasksSlice)
  const [filteredTodoTasks, setFilteredToDoTasks] = useState<Task[]>(todoTasks || [])
  const [filteredDoingTasks, setFilteredDoingTasks] = useState<Task[]>(doingTasks || [])
  const [filteredDoneTasks, setFilteredDoneTasks] = useState<Task[]>(doneTasks || [])
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
    const defaultTaskObject = {
      "taskId": 0,
      "title": "Default title",
      "category": "Default category",
      "dueDate": formatDateString(new Date()),
      "estimate": "Default",
      "importance": 0,
      "status": 0,
      "userId": "string"
    }
    try {
      const response: { tasks: Task[] } = await taskDataSource.createTask({ defaultTaskObject })
      dispatch(setTasks({ tasks: [...response.tasks], todoTasks: [response.tasks[0], ...todoTasks || []] }))
    } catch (error: any) {
    }
  }
  useEffect(() => {
    setFilteredToDoTasks(todoTasks || []);
    setFilteredDoingTasks(doingTasks || []);
    setFilteredDoneTasks(doneTasks || []);
  }, [tasks])
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

  const searchTasks = (query: string) => {
    const regex = new RegExp(query, "i")
    const todo: Task[] = todoTasks?.filter(task => {
      return regex.test(task.title)
    }) || []
    const doing: Task[] = doingTasks?.filter(task => {
      return regex.test(task.title)
    }) || []
    const done: Task[] = doneTasks?.filter(task => {
      return regex.test(task.title)
    }) || []
    setFilteredToDoTasks(todo);
    setFilteredDoingTasks(doing);
    setFilteredDoneTasks(done);
  }

  return { user, tasks, filteredTodoTasks, filteredDoingTasks, filteredDoneTasks, createTask, searchTasks }
}
export default useLogic 