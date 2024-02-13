import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()
  const user = useSelector(extractUserSlice)
  return (
    <div className="logout">
      <div className="avatar">
        <img src="./Bitmap.png" alt="" />
      </div>
      <div className="logout-right">
        <div className="email">{user.email || 'nadim@gmail.com'}</div>
        <div className="holder">
          <p>Log Out</p>  <img onClick={() => {
            localStorage.setItem("user", "sdf")
            navigate('/')
          }} className="logout-icon" src="./Icon ionic-ios-log-out.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
export default Logout 