import React from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
const PaymentPreview = () => {
    const cartProducts = useSelector(state=>state.cart.cart)
    const cartTotalAmount = cartProducts.reduce((acc, curr)=>{
      return acc + (curr.quantity*curr.price);
  
    }, 0)
  
    const deliveryFee = Math.floor(cartTotalAmount*0.009);
    const x = (cartTotalAmount+deliveryFee).toFixed(2)

    const totalAmountWithCommas = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    const handleMpesaPayment = ()=>{
        axios
        .post("http://localhost:5000/api/stkpush", {
                   
        })
        .then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    }
  return (
    <div className='payment-preview'>
      <div className='jumopay'>
        <h1>Jumo<span><i className="fa-solid fa-shield-halved"></i>pay</span></h1>
      </div>
        <div className='total-pay'>
            <p>Total to pay</p>
            <span>Kes {totalAmountWithCommas}</span>
        </div>
        <div className='you-pay'><h1>You will pay with</h1></div>
        <div className='payment-method'>
        <div className='mpesa-number'>
            <p>M-PESA XXXX-9458</p>
            <span>
                <img src='/images/mpesalogo.png' alt='mpesa logo' />
            </span>
            
        </div>
        <div className='different-payment-method'>
                <a href=''>use a different payment method</a>
            </div>
        </div>
        <div className='pay-now'>
                <button onClick={handleMpesaPayment}>Pay Now: KES {totalAmountWithCommas}</button>
            </div>
            <div className='pay-now-terms'>
                <p>
                By tapping "PAY NOW" I accept Jumomart´s 
                <a href=''> Payment Terms & Conditions, General Terms and Conditions, and Privacy and Cookie Notice
                </a>
                </p>
            </div>
        </div>
  )
}

export default PaymentPreview