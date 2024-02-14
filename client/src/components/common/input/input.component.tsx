//css files 
import './input.styles.css'
type InputProps = {
  inputProps: {
    type: string,
    value?: string,
    required?: boolean,
    name: string,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  label?: string,
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