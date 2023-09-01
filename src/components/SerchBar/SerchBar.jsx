
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../main';
import CartWidget from '../CartWidget/CartWidget'
import './SerchBar.css'

function SerchBar() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getData = collection(db, "NFT");
        const querySnapshot = await getDocs(getData);
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchQuery) => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProducts(filteredProducts);

   
    window.location.href = `/store?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <nav className="serchBar">
      <div className="serchContainer">
        <input
          type="text"
          placeholder="Serch..."
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
        <CartWidget/>
      </div>
    </nav>
  );
}

export default SerchBar;
