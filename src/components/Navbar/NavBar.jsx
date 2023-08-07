import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
            <li><a href="" className="navBarData"><i className="bi bi-door-open"></i>  LogIn/Register</a></li>
            
        </div>
    </nav>
  )
}

export default NavBar