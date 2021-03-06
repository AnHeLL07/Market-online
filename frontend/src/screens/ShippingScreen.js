import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen (props) {
    
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();
    
    

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShipping({adress, city, postalCode, country}));
        props.history.push('payment');
    }
    return <div>
        <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                      Livrare Adresă
                    </h2>  
                </li>
                <li>
                    <label htmlFor="adress">Adresă</label>
                    <input type="text" name="adress" id="adress" onChange={(e) => setAdress(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="city">Oraș</label>
                    <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="postalCode">Cod Poștal</label>
                    <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="country">Țară</label>
                    <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Continuă</button>
                </li>
                
            </ul>
        </form>
    </div>

    </div>
    
   
}
export default ShippingScreen;