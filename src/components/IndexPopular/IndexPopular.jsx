import React from 'react'
import { Link } from 'react-router-dom'
import './IndexPopular.css'

const IndexPopular = () => {
  return (
    <div className='displayPopular'>
        <div className='popularDisplay'>
            <h3>Popular Right Now</h3>
            <Link to='./store/'><p>See All</p></Link>
        </div>
        <div className='cardDisplay'>
             <div className='cardDisplay1'>
                <img src="../../../public/img/dataImg/11.jpg" alt="" />
                <div className='popularDetails'>
                    <h4>Futur3</h4>
                    <p>Discover the future in this NFT featuring a sleek, contemplative robot, seamlessly merging technology and human creativity</p>
                </div>
                
            </div>
            <div className='cardDisplay1'>
                <img src="../../../public/img/dataImg/13.jpg" alt="" />
                <div className='popularDetails'>
                    <h4>Gun Fight</h4>
                    <p>Sleek, contemplative robot captured in an innovative NFT that merges creativity and technology</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default IndexPopular