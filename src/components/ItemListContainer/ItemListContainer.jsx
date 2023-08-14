import React, { useEffect, useState } from 'react';
import { jsonCall } from '../../js/jsonCall';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';
import { useParams, useLocation } from 'react-router-dom';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const category = useParams().category;

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search');

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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const filteredProducts = searchQuery
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;

    return (
        <>
            {loading ? <Loader /> : <ItemList products={filteredProducts} />}
        </>
    );
};

export default ItemListContainer;
