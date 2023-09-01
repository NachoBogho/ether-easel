import React, { useContext } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";

const NavBar = () => {

  const { userEmail } = useContext(UserContext);

  
  

  return (
    <nav className='navBarContainer'>
    <Link to="/"><h2>Ether Easel</h2></Link>
        <div className='navBarLinks'>
            <ul>
                <li><Link to="" className="navBarA"><i className="bi bi-house"></i>  Home</Link></li>
                <li><Link to="/store" className="navBarA"><i className="bi bi-shop"></i>Store</Link></li>
                <li><Link to="" className="navBarA"><i className="bi bi-graph-up"></i>  Stats</Link></li>
                <li><Link to="" className="navBarA"><i className="bi bi-gear-wide-connected"></i>  Settings</Link></li>
            </ul>
        </div>
        
        <div className='navBarUser'>
        {userEmail ? (
          <li className="navBarData"><i class="bi bi-person-circle"></i>{userEmail}<i className="bi bi-gear-wide-connected paddingL"></i></li>
        ) : (
          <li>
            <Link to="/login" className="navBarData">
              <i className="bi bi-door-open"></i> LogIn/Register
            </Link>
          </li>
        )}
            
        </div>
    </nav>
  )
}

export default NavBar