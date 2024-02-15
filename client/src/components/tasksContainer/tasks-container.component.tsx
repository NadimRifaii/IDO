import { useDrop } from "react-dnd"
import { Task } from "../../core/types/task"
import TaskComponent from "../task/task.component"

//css files
import './tasks-container.styles.css'
import useLogic from "./logic.hook"

type TasksContainerProps = {
  status: "todoTasks" | 'doingTasks' | 'doneTasks',
  tasks: Task[],
  Icon: () => JSX.Element,
  query: string
}
const TasksContainer = ({ status, tasks, query, Icon }: TasksContainerProps) => {
  const { addItemToSection } = useLogic(status)
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: Task) => addItemToSection(item.taskId),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <div className={`tasks-container ${isOver ? 'over' : ''} `} ref={drop}>
      <div className="status">
        <div className="icon">
          <Icon />
        </div>
        <span>{status == 'todoTasks' ? 'To Do' : status == 'doingTasks' ? 'Doing' : 'Done'}</span>
      </div>
      {
        tasks.map(task => {
          return <TaskComponent highlightTitle={task.title.toLowerCase().includes(query.toLowerCase()) && query.length > 0} task={task} key={task.taskId} />
        })
      }
    </div>
  )
}
export default TasksContainer