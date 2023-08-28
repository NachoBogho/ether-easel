import React, { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';
import { useParams, useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../main';




const ItemListContainer = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const category = useParams().category;

    const location = useLocation();
    
    const searchQuery = new URLSearchParams(location.search).get('search');

    useEffect(() => {
        const showProducts = async () => {
            try {
                setLoading(true);
                setTimeout(async () => {
                    const getData = collection(db, "NFT");
                    const queryData = category ? query(getData, where("category", "==", category)) : getData;
                    const querySnapshot = await getDocs(queryData);

                    const data = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));

                    setProducts(data);
                    setLoading(false);
                }, 1200);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        showProducts();
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
