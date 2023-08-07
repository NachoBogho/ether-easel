import React, { useEffect, useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { getItemById } from '../../js/getItemById'
import { useParams } from 'react-router-dom';


const ItemDetailContainer = () => {

    const  [item, setItem] = useState(null);
    const id = useParams().id;
    
    
    useEffect(() => {
        getItemById(Number(id))
        .then((ans) =>{
            setItem(ans)
        })
    }, [])
    

  return (
    <div>
       {item && <ItemDetail item={item}/>}
    </div>
  )
}

export default ItemDetailContainer