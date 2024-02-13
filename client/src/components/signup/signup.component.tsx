import Button from "../common/button/button.component"
import Input from "../common/input/input.component"

const SignUp = () => {
  return (
    <div className="signup">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
      }}>
        <Input label="Username" inputProps={{ type: "text", changeHandler: () => { } }} />
        <Input label="Email" inputProps={{ type: "email", changeHandler: () => { } }} />
        <Input label="Password" inputProps={{ type: "password", changeHandler: () => { } }} />
        <Button value="Signup" handleClick={() => { }} />
      </form>
    </div>
  )
}
export default SignUp 