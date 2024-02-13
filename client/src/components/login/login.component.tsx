import Button from "../common/button/button.component"
import Input from "../common/input/input.component"
import useLogic from "./logic.hook"
type LoginProps = {
  formToggler: () => void
}
const LogIn = ({ formToggler }: LoginProps) => {
  const { credentials, login, changeHandler } = useLogic()
  return (
    <div className="login">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        login()
      }}>
        <Input label="Email" inputProps={{ type: "email", value: credentials.email, onChange: changeHandler, name: 'email', required: true }} />
        <Input label="Password" inputProps={{ type: "password", value: credentials.password, onChange: changeHandler, name: 'password', required: true }} />
        <Button value="Login" handleClick={() => { }} />
      </form>
      < div className="switch-form" >
        <span>Don't have an account?</span> <button className="switch" onClick={formToggler} >Signup</button>
      </div >
    </div>
  )
}
export default LogIn
