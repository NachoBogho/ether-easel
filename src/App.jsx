
import NavBar from './components/Navbar/NavBar'
import './reset.css'
import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SerchBar from './components/SerchBar/SerchBar'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import IndexContainer from './components/IndexContainer/IndexContainer'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart/Cart'


export default function App() {

  return (
    <div className='Body'>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <SerchBar />
          <Routes>
            <Route path='/' element={<IndexContainer />} />
            <Route path='/store' element={<ItemListContainer />} />
            <Route path='/store/:category' element={<ItemListContainer />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>

  )
}

