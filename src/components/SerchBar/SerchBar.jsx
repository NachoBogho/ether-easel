import React from 'react';
import './SerchBar.css'
import { Link } from 'react-router-dom';




const SerchBar = () => {
  return (
    <nav className="serchBar">
    <div className="serchContainer">
      <input type="text" placeholder="Buscar..." /><i className="bi bi-search"></i>
    </div>
    <div className="serchCart">
      <div className="dropdown">
        <button className="btnConfig" type="button" data-toggle="dropdown">
          Categories<span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><Link to="/store">All</Link></li>
          <li><Link to="/store/MetaPuffer">Metapuffer</Link></li>
          <li><Link to="/store/Rebelzs">Rebelzs</Link></li>
          <li><Link to="/store/Uniqe">Uniqe</Link></li>
          <li><Link to="/store/RGV">RGV</Link></li>
        </ul>
      </div>
      <li><a href="" className=""><i className="bi bi-cart"></i> Cart</a></li>
    </div>
  </nav>
);
};

export default SerchBar;
