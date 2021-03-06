import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userActions';


function RegisterScreen (props) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect);
        }
        return () =>{
            //
        };
    },[userInfo]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(register(name, email, password));
    }
    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                      Creare cont
                    </h2>  
                </li>
                <li>
                    {loading && <div>Încarcă...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">Nume</label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label fhtmlFor="password">Parolă</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <label fhtmlFor="rePassword">Reintroduce-ți parola</label>
                    <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Înregistrare</button>
                </li>
                <li>
                    Ai deja un cont? <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center">Creare cont nou</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default RegisterScreen;