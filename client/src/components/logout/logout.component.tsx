import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "../../assets/logout-icon.component"

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
          <p>Log Out</p>
          <div onClick={() => {
            localStorage.setItem("user", "sdf")
            navigate('/')
          }} className="icon logout-icon">
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Logout 