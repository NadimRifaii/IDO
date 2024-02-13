import LogIn from "../../components/login/login.component"
import SignUp from "../../components/signup/signup.component"


//css files 
import './auth.styles.css'
const AuthPage = () => {
  return (
    <div className="auth">
      <div className="welcome">
        <p>Time to Work!</p>
      </div>
      <SignUp />

    </div>
  )
}
export default AuthPage