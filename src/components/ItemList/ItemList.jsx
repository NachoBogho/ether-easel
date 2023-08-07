import React from 'react'
import Item from '../Item/Item'
import './ItemList.css'

const ItemList = ({products}) => {
  return (
    <>
        <div className="productContainer">
          <div className='productName'>
            <h2>Featured Products</h2>
          </div>
          <div className='productDisplay'>
            {products.map((product) => <Item key={product.id} product={product}/>)}
          </div>
        </div>
    </>
  )
}

export default ItemList