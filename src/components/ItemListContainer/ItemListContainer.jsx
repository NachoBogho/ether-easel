import React, { useEffect, useState } from 'react';
import { jsonCall } from '../../js/jsonCall';   
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';

const ItemListContainer = () => {
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

    return (
        <><ItemList products={products}/></>
    );
};

export default ItemListContainer;
