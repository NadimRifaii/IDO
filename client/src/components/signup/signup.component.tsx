import Button from "../common/button/button.component"
import Input from "../common/input/input.component"

type SignupProps = {
  formToggler: () => void
}

const SignUp = ({ formToggler }: SignupProps) => {
  return (
    <div className="signup">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
      }}>
        <Input label="Username" inputProps={{ type: "text", changeHandler: () => { }, required: true }} />
        <Input label="Email" inputProps={{ type: "email", changeHandler: () => { }, required: true }} />
        <Input label="Password" inputProps={{ type: "password", changeHandler: () => { }, required: true }} />
        <Button value="Signup" handleClick={() => { }} />
      </form>
      <div className="switch-form">
        <span>Already have an account?</span> <button className="switch" onClick={formToggler} >Login</button>
      </div>
    </div>
  )
}
export default SignUp 