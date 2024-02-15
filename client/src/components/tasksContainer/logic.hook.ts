import { setTasks, extractTasksSlice } from "../../core/dataSource/localDataSource/tasksSlice/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../core/types/task";
import { taskDataSource } from "../../core/dataSource/remoteDataSource/taskDataSource";

const useLogic = (status: "todoTasks" | 'doingTasks' | 'doneTasks') => {
  const dispatch = useDispatch();
  const tasksSlice = useSelector(extractTasksSlice);
  const addItemToSection = (id: number) => {
    const { currentTask, taskSection } = findCurrentTask(id);
    const droppedAtSection: "todoTasks" | 'doingTasks' | 'doneTasks' = status
    if (taskSection === droppedAtSection) return;
    const newTasksForOldSection = tasksSlice[taskSection]?.filter(task => task.taskId !== id) || [];
    const task = { ...currentTask, status: findStatusNumber(status) };
    updateTask(task)
    const allTasks = tasksSlice.tasks.map((task) => {
      if (task.taskId == currentTask.taskId) {
        return { ...task, status: findStatusNumber(status) }
      }
      return task
    })
    const newTasksForNewSection = [...(tasksSlice[droppedAtSection] || []), task];
    dispatch(setTasks({ ...tasksSlice, ['tasks']: allTasks, [droppedAtSection]: newTasksForNewSection, [taskSection]: newTasksForOldSection }));
  };
  const findCurrentTask = (id: number): { currentTask: Task, taskSection: "todoTasks" | 'doingTasks' | 'doneTasks' } => {
    for (let i = 0; i < tasksSlice.tasks.length; i++) {
      if (tasksSlice.tasks[i].taskId === id) {
        const taskStatus = tasksSlice.tasks[i].status || 0;
        return {
          currentTask: tasksSlice.tasks[i],
          taskSection: taskStatus === 0 ? 'todoTasks' : taskStatus === 1 ? 'doingTasks' : 'doneTasks'
        };
      }
    }
    return {
      currentTask: {} as Task,
      taskSection: 'todoTasks'
    };
  };
  const findStatusNumber = (status: string) => {
    switch (status) {
      case 'todoTasks':
        return 0;
      case 'doingTasks':
        return 1;
      case 'doneTasks':
        return 2;
      default:
        return 0;
    }
  };
  const updateTask = async (task: Task) => {
    try {
      const response = await taskDataSource.updateTask({ task })
    } catch (error: any) {
    }
  }
  return { addItemToSection };
};

export default useLogic;
