import React, { useEffect, useState } from 'react';
import './SerchBar.css';
import { Link, useParams } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { jsonCall } from '../../js/jsonCall';

const SerchBar = () => {
  const [products, setProducts] = useState([]);
  const category = useParams().category;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ans = await jsonCall();

        if (category) {
          setProducts(ans.filter((product) => product.category === category));
        } else {
          setProducts(ans);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  const handleSearch = (searchQuery) => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Realizar la redirección a /store con los productos filtrados
    window.location.href = `/store?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <nav className="serchBar">
      <div className="serchContainer">
        <input
          type="text"
          placeholder="Buscar..."
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              handleSearch(event.target.value);
            }
          }}
        />
        <i
          className="bi bi-search"
          onClick={() => handleSearch(document.querySelector('.serchContainer input').value)}
        ></i>
      </div>
      <div className="serchCart">
        <div className="dropdown">

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

        </div>
        <CartWidget />
      </div>
    </nav>
  );
};

export default SerchBar;
