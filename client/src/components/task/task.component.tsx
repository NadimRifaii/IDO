import { ConnectDragSource, useDrag } from "react-dnd"
import { Task } from "../../core/types/task"
import Select from "react-select"
import { useState } from "react"
import { taskDataSource } from "../../core/dataSource/remoteDataSource/taskDataSource"

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
  const [options, setOptions] = useState<string[]>(['Low', 'Medium', 'High'])
  const [selectedOption, setSelectedOption] = useState<string>(options[task.importance])
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
          <div className="select-box">
            <Select
              onChange={async (value) => {
                setSelectedOption(value?.label || 'Low')
                try {
                  const currentTask: Task = { ...task, importance: +(value?.value ?? 0) };
                  const response = await taskDataSource.updateTask({ task: currentTask })
                } catch (error: any) {
                }
              }}
              defaultValue={{
                value: `${task.importance}`,
                label: `${options[task.importance]}`,
              }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: `${selectedOption === 'Low' ? '#39AC95' : selectedOption == 'Medium' ? '#FE913E' : '#DC3545'}`,
                  border: 'none',
                  color: 'white'
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#f0f0f0',
                  color: 'black'
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white'
                })
              }}
              options={options.map((option, index) => {
                return {
                  value: index.toString(),
                  label: option
                }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default TaskComponent