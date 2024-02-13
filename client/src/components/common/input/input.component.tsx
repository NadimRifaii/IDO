//css files 
import './input.styles.css'
type InputProps = {
  inputProps: {
    type: string,
    required?: boolean,
    changeHandler: () => void
  }
  label: string,
}
const Input = ({ inputProps, label }: InputProps) => {
  return (
    <div className="input-container">
      <input {...inputProps} />
      <label htmlFor="">{label}</label>
    </div>
  )
}
export default Input 