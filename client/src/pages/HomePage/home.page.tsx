import Header from "../../components/header/header.component"
import useLogic from "./logic.hook"

//css files
import './home.styles.css'
import { useState } from "react"
import TasksContainer from "../../components/tasksContainer/tasks-container.component"
import ToDOIcon from "../../assets/todo-icon.component"
import DoingIcon from "../../assets/doing-icon.component"
import DoneIcon from "../../assets/done-icon.component"
const HomePage = () => {
  const { query, filteredTodoTasks: todoTasks, filteredDoingTasks: doingTasks, filteredDoneTasks: doneTasks, createTask, searchTasks } = useLogic()
  const [activeQuote, setActiveQuote] = useState(true)
  return (
    <div className="home-page">
      <Header searchTasks={searchTasks} createTask={createTask} />
      {
        activeQuote ?
          <div className="quote">
            <p>"Anything that can go wrong, will go wrong"</p>
            <div onClick={() => setActiveQuote(false)} className="x-toggler">X</div>
          </div>
          : <img className="show-quote" onClick={() => setActiveQuote(true)} src="./ShowQuote.png" />
      }
      <div className="scroll-container">
        <div className="container" style={{
          height: `${activeQuote ? 'calc(100vh - 170px)' : 'calc(100vh - 95px)'}`
        }} >
          <TasksContainer query={query} Icon={ToDOIcon} status="todoTasks" tasks={todoTasks || []} />
          <TasksContainer query={query} Icon={DoingIcon} status="doingTasks" tasks={doingTasks || []} />
          <TasksContainer query={query} Icon={DoneIcon} status="doneTasks" tasks={doneTasks || []} />
        </div>
      </div>
    </div>
  )
}
export default HomePage
