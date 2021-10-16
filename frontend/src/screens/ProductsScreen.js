import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Products } from '../actions/userActions';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';


function ProductsScreen (props) {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;

    const productSave = useSelector(state=>state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;

    const productDelete = useSelector(state=>state.productDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;
    const dispatch = useDispatch();

    useEffect(() =>{
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts())
        return () =>{
            //
        };
    },[successSave, successDelete]);

    const openModal = (product) =>{
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setRating(product.rating);
        setNumReviews(product.numReviews);
        setDescription(product.description);
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveProduct({_id: id, name, price, image, brand, category, countInStock, description}));
    }

    const deleteHandler = (product) =>{
        dispatch(deleteProduct(product._id));
    }

    return <div className="content content-margined">
    <div className="product-header">
        <h3>Produse</h3>
        <button className="button primary" onClick={()=>openModal({})}>Adaugă produs</button>
    </div>
    {modalVisible &&
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                      Adaugă produs
                    </h2>  
                </li>
                <li>
                    {loadingSave && <div>Încarcă...</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">Nume</label>
                    <input type="text" value={name} name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="price">Preț</label>
                    <input type="number" value={price} name="price" id="price" onChange={(e) => setPrice(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="image">Imagine</label>
                    <input type="text" value={image} name="image" id="image" onChange={(e) => setImage(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="brand">Brand</label>
                    <input type="text" value={brand} name="brand" id="brand" onChange={(e) => setBrand(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="countInStock">Număr produse</label>
                    <input type="number" value={countInStock} name="countInStock" id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="category">Categorie</label>
                    <input type="text" value={category} name="category" id="category" onChange={(e) => setCategory(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="description">Descriere</label>
                    <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}/>
                </li>
                <li>
                    <button type="submit" className="button primary">{id?"Actualizează":"Crează"}</button>
                </li>
                <li>
                    <button type="button" onClick={()=>setModalVisible(false)} className="button secondary">Înapoi</button>
                </li>
            </ul>
        </form>
    </div>
}
    <div className="product-list">
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nume</th>
                    <th>Preț</th>
                    <th>Categorie</th>
                    <th>Brand</th>
                    <th>Acțiune</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product =>(
                    <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        <button className="button" onClick={()=>openModal(product)}>Editează</button>
                        {' '}
                        <button className="button" onClick={() => deleteHandler(product)}>Șterge</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
    
    

    
}
export default ProductsScreen;