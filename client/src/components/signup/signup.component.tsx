import Button from "../common/button/button.component"
import Input from "../common/input/input.component"
import useLogic from "./logic.hook"

type SignupProps = {
  formToggler: () => void
}

const SignUp = ({ formToggler }: SignupProps) => {
  const { credentials, signup, changeHandler } = useLogic()
  return (
    <div className="signup">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        signup()
      }}>
        <Input label="Username" inputProps={{ type: "text", value: credentials.userName, onChange: changeHandler, name: 'userName', required: true }} />
        <Input label="Email" inputProps={{ type: "email", value: credentials.email, onChange: changeHandler, name: 'email', required: true }} />
        <Input label="Password" inputProps={{ type: "password", value: credentials.password, onChange: changeHandler, name: 'password', required: true }} />
        <Button value="Signup" handleClick={() => { }} />
      </form>
      <div className="switch-form">
        <span>Already have an account?</span> <button className="switch" onClick={formToggler} >Login</button>
      </div>
    </div>
  )
}
export default SignUp 