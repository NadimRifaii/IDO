import Header from "../../components/header/header.component"
import useLogic from "./logic.hook"

//css files
import './home.styles.css'
import { useState } from "react"
const HomePage = () => {
  const [activeQuote, setActiveQuote] = useState(true)
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
    </div>
  )
}
export default HomePage 