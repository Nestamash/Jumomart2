import React from 'react';
import './stripeSuccess.scss';
import { NavLink } from 'react-router-dom'
const StripeSuccess = () => {
  return (
    <div className='success-body-container'>
    <div className="success-container">
      <div className="success-icon">
        <div className="circle"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="48px" height="48px">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
      </div>
      <p className="success-message">Payment Successful!</p>
      <div className="additional-content">
        <p>Your order has been confirmed. Thank you for shopping with us!</p>
        {/* Add more content or components as needed */}
      </div>
      <NavLink to={'/'}>
      <button className="continue-shopping-button">Continue Shopping</button>
      </NavLink>
    </div>
    </div>
  );
}

export default StripeSuccess;
