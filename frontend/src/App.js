import React from 'react';
import {BrowserRouter, Route, Link, useHistory} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './App.css';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import SearchBox from './SearchBox';

function App() {
  
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    const history=useHistory();
    function logOut(){
        localStorage.clear();
        history.push('/register');
    }   

  return (
  <BrowserRouter>   
  <div className="grid-container">
  <header className="header">
      <div className="brand">
          
          <Link to="/">Market</Link>
      </div>
      <div className="header-links">
          <a href="/cart" className="header-links">Coș{' '}</a>
          
          {
              userInfo ? <Link to="/profile"> {userInfo.name} <Link to="/products"> Editeaza produs </Link> </Link>:

                <Link to="/signin">Autentificare</Link>
          }
      </div>
  </header>
  <aside className="sidebar">
      <h3>Categorii</h3>
      <button className="sidebar-close-button" onClick={closeMenu}>x</button>
      <ul>
          <li>
              <a href="index.html">Iphone</a>
          </li>

          <li>
              <a href="index.html">Samsung</a>
          </li>
      </ul>
  </aside>

  <main className="main">
      <div className="content">
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          
      </div>
  </main>
  <footer className="footer">
      Toate drepturile sunt rezervate.
  </footer>
</div>
</BrowserRouter>
  );
}

export default App;
