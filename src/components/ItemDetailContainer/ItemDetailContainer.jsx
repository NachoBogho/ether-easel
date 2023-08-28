import React, { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../main';

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const id = useParams().id;

    useEffect(() => {
       const getProduct = doc(db, "NFT", id);
       getDoc(getProduct)
       .then((answ) => {
           setItem(
            { ...answ.data(), id: answ.id}

            );
       
    })
       
    }, [id]);

    return (
        <div>
            {item && <ItemDetail item={item} />}
        </div>
    );
};

export default ItemDetailContainer;
