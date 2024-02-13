type ButtonProps = {
  value: string,
  handleClick: () => void
}
const Button = ({ value, handleClick }: ButtonProps) => {
  return (
    <div className="button-container">
      <button onClick={handleClick} >{value}</button>
    </div>
  )
}
export default Button 