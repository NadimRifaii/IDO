import Input from "../common/input/input.component"

const SignUp = () => {
  return (
    <div className="signup">
      <div className="input-container">
        <Input label="Username" inputProps={{ type: "text", changeHandler: () => { } }} />
        <Input label="Email" inputProps={{ type: "email", changeHandler: () => { } }} />
        <Input label="Password" inputProps={{ type: "password", changeHandler: () => { } }} />

      </div>
    </div>
  )
}
export default SignUp 