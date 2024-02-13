
//css files 
import { useState } from 'react'
import './header.styles.css'
import Logout from '../logout/logout.component'
const Header = () => {
  const [activeLogout, setActiveLogout] = useState(false)
  return (
    <div className="header">
      <div className="logo">
        <img src="./Logo.png" alt="" />
      </div>
      <div className="nav">
        <div className="buttons"></div>
        <div className="avatar">
          <img onClick={() => setActiveLogout(!activeLogout)} src="./Bitmap.png" alt="" />
        </div>
        {
          activeLogout && <Logout />
        }
      </div>
    </div>
  )
}
export default Header 