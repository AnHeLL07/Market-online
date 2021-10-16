import React, { useEffect} from 'react';
import {Link} from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

function HomeScreen (props) {

    
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(listProducts());

        return () =>{
            //
        };
    }, []);

    return loading ? <div>Încarcă...</div>:
    error ? <div>{error}</div>:

    <ul className="products">{
        products.map(product =>
        <li key={product._id}>
            <div className="product">
            <Link to={'/product/' + product._id}>
                <img className="product-image" src={product.image} alt="product"></img>
                </Link>
                <div className="product-name">
                    <Link to={'/product/' + product._id}>Telefon: {product.name}</Link>
                </div>
                <div className="product-brand">Brand: {product.brand}</div>
                <div className="product-price">Preț: ${product.price}</div>
                <div className="product-raiting">Raiting: {product.rating} Stele {product.numReiews}</div>
            </div>
        </li>)
}
    </ul>
}
export default HomeScreen;