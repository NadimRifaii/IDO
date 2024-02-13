import { useState } from "react"
import LogIn from "../../components/login/login.component"
import SignUp from "../../components/signup/signup.component"
//css files 
import './auth.styles.css'
const AuthPage = () => {
  const [activeForm, setActiveForm] = useState("login")
  return (
    <div className="auth">
      <div className="welcome">
        <p>Time to Work!</p>
      </div>
      {
        activeForm === "signup" ? <SignUp formToggler={() => setActiveForm('login')} /> : <LogIn formToggler={() => setActiveForm('signup')} />
      }
    </div>
  )
}
export default AuthPage