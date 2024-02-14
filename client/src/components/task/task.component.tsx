import { ConnectDragSource, useDrag } from "react-dnd"
import { Task } from "../../core/types/task"

type TaskProps = {
  task: Task,
  isDragging?: boolean,
  drag?: ConnectDragSource
}
const TaskComponent = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { taskId: task.taskId },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <div ref={drag} className={`task ${isDragging ? 'dragging' : ''}`}>
      <div className="title">
        {task.title}
      </div>
      <div className="category row">
        <div className="key">Category</div>
        <div className="value">
          {task.category}
        </div>
      </div>
      <div className="due-date row">
        <div className="key">
          Due Date
        </div>
        <div className="value">
          {task.dueDate.split("T")[0]}
        </div>
      </div>
      <div className="estimate row">
        <div className="key">
          Estimate
        </div>
        <div className="value">
          {task.estimate}
        </div>
      </div>
      <div className="importance row">
        <div className="key">
          Importance
        </div>
        <div className="value">
          {task.importance}
        </div>
      </div>
    </div>
  )
}
export default TaskComponent