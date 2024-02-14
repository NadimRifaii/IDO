import Header from "../../components/header/header.component"
import useLogic from "./logic.hook"

//css files
import './home.styles.css'
import { useEffect, useState } from "react"
const HomePage = () => {
  const { todoTasks } = useLogic()
  const [activeQuote, setActiveQuote] = useState(true)
  useEffect(() => {
    console.log(todoTasks)
  }, [todoTasks])
  return (
    <div className="home-page">
      <Header />
      {
        activeQuote ?
          <div className="quote">
            <p>"Anything that can go wrong, will go wrong"</p>
            <div onClick={() => setActiveQuote(false)} className="x-toggler">X</div>
          </div>
          : <img className="show-quote" onClick={() => setActiveQuote(true)} src="./ShowQuote.png" />
      }
      <div className="tasks-container">
        <div className="todo">
          {
            todoTasks?.map((task, index) => {
              return <h1 key={task.taskId} >{task.title}</h1>
            })
          }
        </div>
      </div>
    </div>
  )
}
export default HomePage 