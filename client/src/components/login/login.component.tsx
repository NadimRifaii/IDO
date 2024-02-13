import Button from "../common/button/button.component"
import Input from "../common/input/input.component"
type LoginProps = {
  formToggler: () => void
}
const LogIn = ({ formToggler }: LoginProps) => {
  return (
    <div className="login">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
      }}>
        <Input label="Email" inputProps={{ type: "email", onChange: () => { }, name: 'email', required: true }} />
        <Input label="Password" inputProps={{ type: "password", onChange: () => { }, name: 'email', required: true }} />
        <Button value="Login" handleClick={() => { }} />
      </form>
      < div className="switch-form" >
        <span>Don't have an account?</span> <button className="switch" onClick={formToggler} >Signup</button>
      </div >
    </div>
  )
}
export default LogIn
