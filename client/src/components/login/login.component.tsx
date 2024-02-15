import Button from "../common/button/button.component"
import Input from "../common/input/input.component"
import useLogic from "./logic.hook"
type LoginProps = {
  formToggler: () => void
}
const LogIn = ({ formToggler }: LoginProps) => {
  const { credentials, validEmail, validPassword, login, changeHandler, isValidEmail, isValidPassword } = useLogic()
  return (
    <div className="login">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        login()
      }}>
        <Input label="Email" validEmail={validEmail} inputProps={{ type: "email", value: credentials.email, onChange: changeHandler, onBlur: (e) => isValidEmail(e.target.value), name: 'email', required: true, placeholder: 'user@example.com' }} />
        <Input label="Password" validPassword={validPassword} inputProps={{ type: "password", value: credentials.password, onChange: changeHandler, onBlur: (e) => isValidPassword(e.target.value), name: 'password', required: true, placeholder: 'password1234' }} />
        <Button value="Login" handleClick={() => { }} />
      </form>
      < div className="switch-form" >
        <span>Don't have an account?</span> <button className="switch" onClick={formToggler} >Signup</button>
      </div >
    </div>
  )
}
export default LogIn
