import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import Cookie from "js-cookie";
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart:{cartItems, shipping:{}, payment:{}}, userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})
const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;