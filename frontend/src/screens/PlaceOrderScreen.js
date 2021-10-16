import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props){

    const cart = useSelector(state => state.cart);
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1;
    const {cartItems, shipping, payment} = cart;
    if(!shipping.adress){
        props.history.push("/shipping");
    } else if(!payment.paymentMethod){
        props.history.push("/payment");
    }

    const itemsPrice =cartItems.reduce((a,c)=> a+c.price*qty,0);
    const shippingPrice = itemsPrice >100 ? 0 :10;
    const taxPrice = 0.15* itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();
    
const placeOrderHandler = () =>{
    //create an order
}

    useEffect(() =>{

    }, [])
    
    const checkoutHandler = () =>{
        props.history.push("/signin?redirect=shipping");
    }
    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeorder">
        <div className="placeorder-info">
            <div>
                <h3>
                    Livrare
                </h3>
                <div>
                    {cart.shipping.adress} {cart.shipping.city}
                    {cart.shipping.postalCode} {cart.shipping.country}
                </div>
            </div>
            <div>
                
            </div>
            <div>
               <h3>Plată</h3>
               <div>
                    Metodă de plată: {cart.payment.paymentMethod}    
               </div> 
            </div>
            <div>
            <ul className="cart-list-container">
                <li>
                    <h3>
                       Coș de cumpărături 
                    </h3>
                    <div>
                        Preț
                    </div>
                </li>
                {
                    cartItems.length ===0 ?
                    <div>
                        Coșul este gol
                    </div>
                    :
                    cartItems.map(item =>
                        <li>
                            <div className="cart-image">
                            <img src={item.image} alt="product"/>
                            </div>
                            <div className="cart-name">
                                <Link to={"/product/" + item.product}>
                                {item.name}  
                                </Link>
                            </div>
                            <div>
                                Cantitate: {item.qty}
                                
                            </div>
                            <div className="cart-price">
                                ${item.price}
                            </div>
                        </li>)
                }
            </ul>
            </div>
            

        </div>
        <div className="placeorder-action">
            <ul>
                <li>
                    <button className="button primary full-width" onClick={placeOrderHandler}>Plasează comanda</button>
                </li>
                <li>
                    <h3>Rezumat comandă</h3>
                </li>
                <li>
                    <div>Produse</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Livrare</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Taxe</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Total comandă</div>
                    <div>${totalPrice}</div>
                </li>
            </ul>
                
        </div>
    </div>

    </div>

    
}

export default PlaceOrderScreen;