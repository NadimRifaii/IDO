//css files 
import { useEffect, useState } from 'react'
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
  validEmail?: boolean | null,
  validPassword?: boolean | null
}
const Input = ({ inputProps, label, validEmail, validPassword }: InputProps) => {
  const { type } = inputProps
  const [errorText, setErrorText] = useState<string>(`${type == 'email' ? 'Invalid email!' : 'Invalid password!'}`)
  return (
    <div className="input-container">
      <input {...inputProps} />
      <label>{label}</label>
      {
        (typeof validEmail == 'boolean' && !validEmail) || ((typeof validPassword == 'boolean' && !validPassword)) ?
          <div className='error-state' >{errorText}</div>
          : ''
      }
    </div>
  )
}
export default Input 