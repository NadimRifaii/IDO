type HeaderProps = {
  createTask: () => void
}
//css files 
import { useState } from 'react'
import './header.styles.css'
import Logout from '../logout/logout.component'
import Input from '../common/input/input.component'
const Header = ({ createTask }: HeaderProps) => {
  const [activeLogout, setActiveLogout] = useState(false)
  return (
    <div className="header">
      <div className="logo">
        <img src="./Logo.png" alt="" />
      </div>
      <div className="nav">
        <div className="search">
          <img src='./Search.svg' />
          <Input inputProps={{ type: 'text', name: 'search', placeholder: "What are you looking for?" }} />
        </div>
        <div className="add-icon" onClick={createTask}>
          <img src='./Circle.svg' />
          <img src="./Add.svg" alt="" />
        </div>
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