import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { auth, db } from '../../firestore';  
import { NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import './style.css'
const PaymentPreview = () => {

  const [userDetails, setUserDetails] = useState(null);

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

    const navigate = useNavigate()
    
          useEffect(() => {
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                try {
                  const userDocRef = doc(db, 'users', user.uid);
                  const userDocSnapshot = await getDoc(userDocRef);
        
                  if (userDocSnapshot.exists()) {
                    // User document exists, update the state with user details
                    setUserDetails(userDocSnapshot.data());
                  } else {
                    // Handle the case where the user document does not exist
                  }
                } catch (error) {
                  // Handle any errors that may occur while fetching user data
                  console.error('Error fetching user data:', error);
                }
              } else {
                // User is signed out
                // ...
                navigate('/login-page');
              }
            });
          }, []);

          function formatPhoneNumber(phoneNumber) {

            if (!phoneNumber) {
              return ''; // Handle the case where phoneNumber is null or undefined
            }
            
            // Remove leading zeros
            const cleanedNumber = phoneNumber.replace(/^0+/, '');
          
            // Extract the last four digits
            const lastFourDigits = cleanedNumber.slice(-4);
          
            // Replace the remaining digits with 'X'
            const formattedNumber = 'XXXX-' + lastFourDigits;
          
            return formattedNumber;
          }

          console.log('user paymentprevioew: ', userDetails?.email);
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
            <p>M-PESA {formatPhoneNumber(userDetails?.phoneNumber)}</p>
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