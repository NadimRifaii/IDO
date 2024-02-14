import { useDrop } from "react-dnd"
import { Task } from "../../core/types/task"
import TaskComponent from "../task/task.component"

//css files
import './tasks-container.styles.css'
import useLogic from "./logic.hook"

type TasksContainerProps = {
  status: string,
  tasks: Task[],
  Icon: () => JSX.Element
}
const TasksContainer = ({ status, tasks, Icon }: TasksContainerProps) => {
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
        <span>{status}</span>
      </div>
      {
        tasks.map(task => {
          return <TaskComponent task={task} key={task.taskId} />
        })
      }
    </div>
  )
}
export default TasksContainer