import { ConnectDragSource, useDrag } from "react-dnd"
import { Task } from "../../core/types/task"
import Select from "react-select"
import { useState } from "react"
import { taskDataSource } from "../../core/dataSource/remoteDataSource/taskDataSource"


//css files
import './task.styles.css'
import Input from "../common/input/input.component"
import useLogic from "./logic.hook"
type TaskProps = {
  task: Task,
  isDragging?: boolean,
  drag?: ConnectDragSource
}
const TaskComponent = ({ task }: TaskProps) => {
  const { credentials, changeHandler, updateTask, dispatch, setTasks, setCredentials } = useLogic(task)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { taskId: task.taskId },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  const options: string[] = ['Low', 'Medium', 'High']
  const [selectedOption, setSelectedOption] = useState<string>(options[task.importance])
  return (
    <div ref={drag} className={`task ${isDragging ? 'dragging' : ''}`}>
      <div className="title">
        <Input inputProps={{ type: 'text', onChange: changeHandler, onBlur: updateTask, value: credentials.title, name: 'title' }} />
      </div>
      <div className="category row">
        <div className="key">Category</div>
        <div className="value">
          <Input inputProps={{ type: 'text', onChange: changeHandler, onBlur: updateTask, value: credentials.category, name: 'category' }} />
        </div>
      </div>
      <div className="due-date row">
        <div className="key">
          Due Date
        </div>
        <div className="value">
          <Input inputProps={{ type: 'date', onChange: changeHandler, onBlur: updateTask, value: credentials.dueDate.split("T")[0], name: 'dueDate' }} />
        </div>
      </div>
      <div className="estimate row">
        <div className="key">
          Estimate
        </div>
        <div className="value">
          <Input inputProps={{ type: 'text', onChange: changeHandler, onBlur: updateTask, value: credentials.estimate, name: 'estimate' }} />
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
                  setCredentials({ ...credentials, ['importance']: +(value?.value ?? 0) })
                  let response = await taskDataSource.updateTask({ task: currentTask })
                  console.log(response)
                  response = await taskDataSource.getUserTasks({})
                  dispatch(setTasks(response))
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