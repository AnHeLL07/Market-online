import React from 'react';

function CheckoutSteps(props){
    return <div className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>Autentificare</div>
        <div className={props.step2 ? 'active' : ''}>Livrare</div>
        <div className={props.step3 ? 'active' : ''}>Plată</div>
        <div className={props.step4 ? 'active' : ''}>Plasare comandă</div>
    </div>
}

export default CheckoutSteps