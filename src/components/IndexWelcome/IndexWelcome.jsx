import React from 'react'
import './IndexWelcome.css'
import { Link } from 'react-router-dom'

const IndexWelcome = () => {
  return (
    <div>
        <div className='IndexCard'>
        <Link to='/store'><img src="../../../public/img/indexImg/4.jpg" alt="" /><h2>Find the Best NFT for You</h2></Link>
        </div>
    </div>
  )
}

export default IndexWelcome