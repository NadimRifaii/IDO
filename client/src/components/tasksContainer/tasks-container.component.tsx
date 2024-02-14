import { Task } from "../../core/types/task"

//css files
import './tasks-container.styles.css'

type TasksContainerProps = {
  status: string,
  tasks: Task[],
  Icon: () => JSX.Element
}
const TasksContainer = ({ status, tasks, Icon }: TasksContainerProps) => {
  return (
    <div className="tasks-container">
      <div className="status">
        <div className="icon">
          <Icon />
        </div>
        <span>{status}</span>
      </div>

    </div>
  )
}
export default TasksContainer