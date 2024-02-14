import Header from "../../components/header/header.component"
import useLogic from "./logic.hook"

//css files
import './home.styles.css'
import { useEffect, useState } from "react"
import TasksContainer from "../../components/tasksContainer/tasks-container.component"
import ToDOIcon from "../../assets/todo-icon.component"
import DoingIcon from "../../assets/doing-icon.component"
import DoneIcon from "../../assets/done-icon.component"
const HomePage = () => {
  const { todoTasks, doingTasks, doneTasks, createTask } = useLogic()
  const [activeQuote, setActiveQuote] = useState(true)
  useEffect(() => {
    console.log(todoTasks)
  }, [todoTasks])
  return (
    <div className="home-page">
      <Header createTask={createTask} />
      {
        activeQuote ?
          <div className="quote">
            <p>"Anything that can go wrong, will go wrong"</p>
            <div onClick={() => setActiveQuote(false)} className="x-toggler">X</div>
          </div>
          : <img className="show-quote" onClick={() => setActiveQuote(true)} src="./ShowQuote.png" />
      }
      <div className="container">
        <TasksContainer Icon={ToDOIcon} status="To Do" tasks={todoTasks || []} />
        <TasksContainer Icon={DoingIcon} status="Doing" tasks={doingTasks || []} />
        <TasksContainer Icon={DoneIcon} status="Done" tasks={doneTasks || []} />
      </div>
    </div>
  )
}
export default HomePage
