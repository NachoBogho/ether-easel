import React, { useEffect, useState } from 'react';
import { jsonCall } from '../../js/jsonCall';   
import ItemList from '../ItemList/ItemList';
import Loader from "../Loader/Loader"
import { useParams } from 'react-router-dom';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const category = useParams().category;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const ans = await jsonCall();

                if (category) {
                    setProducts(ans.filter((product) => product.category === category));
                } else {
                    setProducts(ans);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally{
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    return (
        <>
        {loading ? <Loader />:<ItemList products={products}/>}
        </>
    );
};

export default ItemListContainer;
