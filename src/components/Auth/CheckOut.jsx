import React, { useEffect, useState } from 'react'
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from '../../firestore';  
import { NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';
import './style.css'
const CheckOut = () => {
  const cartProducts = useSelector(state=>state.cart.cart)
 
  const cartTotalAmount = cartProducts.reduce((acc, curr)=>{
    return acc + (curr.quantity*curr.price);

  }, 0)

  const deliveryFee = Math.floor(cartTotalAmount*0.009);

  const numberOfProductsInCart = cartProducts.reduce((acc, curr)=>{
    return acc + curr.quantity;

  }, 0)
  const x = (cartTotalAmount+deliveryFee).toFixed(2)

  const totalAmountWithCommas = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  


    const [logOutError, setLogOutError] = useState(null)
    const [loginUserEmail, setLoginUserEmail]= useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              setLoginUserEmail(user.email)
              // ...
            } else {
              // User is signed out
              // ...
              navigate('/login-page')
            }
          });
    }, [])

    const handleSignOut = ()=>{
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            navigate('/')
          }).catch((error) => {
            // An error happened.
            setLogOutError(error)
          });
    }

    const handlePaymentStripe = (items)=>{

      axios
      .post("http://localhost:3000/create-checkout-session", {
        items,
        
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  
  }
  

  return (

      
        <section className='check-out-container'>
          <div className='address'>
            <div className='heading'>
              <h1>
              <i className="fa-solid fa-circle-check"></i>
                1. Customer Address
                </h1>
              <a href='#'>Change
              <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className='checkout-name'>
              <h1>Peter Macharia</h1>
              <p>
                <span>Juja</span>
                <span>Kirinyanga-Kerugoya Town</span>
                <span>+254 729 989 466</span>
              </p>
            </div>
          </div>
          
          <div className='order-summary'>
            <h1>Order summary</h1>
            <div className='order-p'>
              <p>Item's total ({numberOfProductsInCart})</p>
              <span>Ksh {cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </div>
              <div className='delivery-fee'>
                <p>Delivery fees</p>
                <span>Ksh {deliveryFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </div>
              <div className='order-total'>
                <h1>Total</h1>
                <span>Ksh {totalAmountWithCommas}</span>
              </div>
              <div className='confirm-order alink'>
              <NavLink to={'/payment-preview'} end >
              <button>Pay with Mpesa</button>
              </NavLink>
              <button onClick={()=>handlePaymentStripe(cartProducts)}>Pay with Stripe</button>
                
              </div>

              <div className='terms-and-condition'>
              <p>By proceeding, you are automatically accepting the 
                <a href='' > Terms & Conditions</a></p>
            </div>
            
          </div>

          <div className='delivery-details'>
          <div className='heading'>
              <h1>
              <i className="fa-solid fa-circle-check"></i>
                2. Delivery details
                </h1>
              <a href='#'>Change
              <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className='checkout-name'>
              <h1>Pick-up Station</h1>
              <p>Delivery between 22 Aug and 24 Aug</p>
            </div>
            <div className='pick-up-station'>

            <div className='heading'>
              <h1>
              
                Pickup Station
                </h1>
              <a href='#'>Change
              <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className='checkout-name'>
              <h1>Jumomart Flexcom Kerugoya Station</h1>
              <p>Kerugoya Mall ( Cabanas) opposite Jeevanjee Gardens, Ground floor, shop no. 4, opposite Jeevanjee Gardens, Ground floor, shop no. 4 | Kirinyaga - Kerugoya Town</p>
            </div>
            </div>
            <div className='heading-shipment'>
              <h1>Shipment 1/1</h1>
              <span>Fulfilled by Jumomart
              <i className="fa-regular fa-handshake"></i>
              </span>
            </div>
            <div className='shipment-products'>
              <h1>Pick-up Products</h1>
              <p>Delivery between 23 Aug and 25 Aug</p>

              <div className='shipment-items'>
                {
                  cartProducts.map(item=>{
                    return(
                      <picture>
                        <img src={item.image_url} alt='items' />
                        <div>
                        <span>{item.title}</span>
                        <p>Qty: {item.quantity}</p>
                        </div>
                      </picture>
                    );
                  })
                }

              </div>  
            </div>
            <div className='modify-cart'>
             
              <NavLink to={'/cart'} end >
                Modify cart</NavLink>
              </div>
          </div>
          <div className='payment-method checkout-method'>
          <div className='heading'>
              <h1>
              <i className="fa-solid fa-circle-check"></i>
                3. payment method
                </h1>
              <a href='#'>Change
              <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className='payment-p'>
            <p>Jumia Pay Now(Mpesa, Airtel Money, Bank Cards, Standard Chartered Credit Card @ 0% Interest - 6 Months)</p>
            <p>Pay now fast and securely with JumiaPay, Mastercard or Visa</p>
            </div>

          </div>
          <div className='go-back-shopping'>

           <NavLink to={'/'} end >
              <i className="fa-solid fa-chevron-left"></i>
                Go back & continue shopping</NavLink>
            </div>
           
        </section>
  
  )
}

export default CheckOut