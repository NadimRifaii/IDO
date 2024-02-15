import { useDispatch, useSelector } from "react-redux"
import { extractUserSlice, removeUser } from "../../core/dataSource/localDataSource/userSlice/userSlice"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "../../assets/logout-icon.component"
import { removeTasks } from "../../core/dataSource/localDataSource/tasksSlice/tasksSlice"
import { User } from "../../core/types/user"

const Logout = () => {
  const navigate = useNavigate()
  const user = useSelector(extractUserSlice)
  const dispatch = useDispatch()
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
            localStorage.clear()
            dispatch(removeUser({}))
            dispatch(removeTasks({}))
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