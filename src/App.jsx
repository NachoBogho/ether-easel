import Cart from './components/Cart/Cart'
import LogIn from './components/Login/LogIn'
import NavBar from './components/Navbar/NavBar'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import IndexContainer from './components/IndexContainer/IndexContainer'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import SerchBar from './components/SerchBar/SerchBar'
import CheckOut from './components/CheckOut/CheckOut'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import './reset.css'
import './App.css'



export default function App() {

  return (
    <div className='Body'>
      <CartProvider>
      <UserProvider>
        <BrowserRouter>
          <NavBar />
          <SerchBar />
          <Routes>
            <Route path='/' element={<IndexContainer />} />
            <Route path='/store' element={<ItemListContainer />} />
            <Route path='/store/:category' element={<ItemListContainer />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LogIn/>} />
            <Route path='/gopay' element={<CheckOut/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      </CartProvider>
    </div>

  )
}

