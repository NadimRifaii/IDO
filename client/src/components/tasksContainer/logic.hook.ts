import { setTasks, extractTasksSlice } from "../../core/dataSource/localDataSource/tasksSlice/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../core/types/task";
import { useEffect } from "react";

const useLogic = (status: string) => {
  const dispatch = useDispatch();
  const tasksSlice = useSelector(extractTasksSlice);

  const addItemToSection = (id: number) => {
    const { currentTask, taskSection } = findCurrentTask(id);

    const droppedAtSection: "todoTasks" | 'doingTasks' | 'doneTasks' = status === 'To Do' ? 'todoTasks' : status === 'Doing' ? 'doingTasks' : 'doneTasks';

    const newTasksForOldSection = tasksSlice[taskSection]?.filter(task => task.taskId !== id) || [];

    const task = { ...currentTask, status: findStatusNumber(status) };
    const allTasks = tasksSlice.tasks.map((task, index) => {
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
      case 'To Do':
        return 0;
      case 'Doing':
        return 1;
      case 'Done':
        return 2;
      default:
        return 0;
    }
  };

  return { addItemToSection };
};

export default useLogic;
