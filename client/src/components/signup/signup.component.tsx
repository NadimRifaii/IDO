import Button from "../common/button/button.component"
import Input from "../common/input/input.component"
import useLogic from "./logic.hook"

type SignupProps = {
  formToggler: () => void
}

const SignUp = ({ formToggler }: SignupProps) => {
  const { credentials, validEmail, validPassword, isValidEmail, isValidPassword, signup, changeHandler } = useLogic()
  return (
    <div className="signup">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        signup()
      }}>
        <Input label="Username" inputProps={{ type: "text", value: credentials.userName, onChange: changeHandler, name: 'userName', required: true, placeholder: 'Gold' }} />
        <Input label="Email" validEmail={validEmail} inputProps={{ type: "email", value: credentials.email, onChange: changeHandler, onBlur: (e) => isValidEmail(e.target.value), name: 'email', required: true, placeholder: 'user@example.com' }} />
        <Input label="Password" validPassword={validPassword} inputProps={{ type: "password", value: credentials.password, onChange: changeHandler, onBlur: (e) => isValidPassword(e.target.value), name: 'password', required: true, placeholder: 'password1234' }} />
        <Button value="Signup" handleClick={() => { }} />
      </form>
      <div className="switch-form">
        <span>Already have an account?</span> <button className="switch" onClick={formToggler} >Login</button>
      </div>
    </div>
  )
}
export default SignUp 