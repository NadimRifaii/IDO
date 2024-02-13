import Button from "../common/button/button.component"
import Input from "../common/input/input.component"
type LoginProps = {
  formToggler: () => void
}
const LogIn = ({ formToggler }: LoginProps) => {
  return (
    <div className="signup">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
      }}>
        <Input label="Email" inputProps={{ type: "email", changeHandler: () => { }, required: true }} />
        <Input label="Password" inputProps={{ type: "password", changeHandler: () => { }, required: true }} />
        <Button value="Login" handleClick={() => { }} />
      </form>
      < div className="switch-form" >
        <span>Don't have an account?</span> <button className="switch" onClick={formToggler} >Signup</button>
      </div >
    </div>
  )
}
export default LogIn
