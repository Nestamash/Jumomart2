import React from 'react'
import { NavLink } from 'react-router-dom'
// import { doc, getDoc } from "firebase/firestore";
// import { db } from '../../firestore';
// import { useState } from 'react';
import NavBar from '../../layouts/navbar/NavBar'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, decreaseCart } from '../../redux/cartSlice';
import './cart.scss'

const Cart = () => {

  const cartProducts = useSelector(state=>state.cart.cart)
  const dispatch = useDispatch()
 
   console.log('cartProducts:', cartProducts)

   const cartTotalAmount = cartProducts.reduce((acc, curr)=>{
    return acc + (curr.quantity*curr.price);

  }, 0)

   const numberOfProductsInCart = cartProducts.reduce((acc, curr)=>{
    return acc + curr.quantity;

  }, 0)
  console.log('numberCarts:', numberOfProductsInCart)
 
  return (
    <>
     <NavBar />
    
    <div className='container'>
       
          {
            cartProducts.length>0?
            <div className='categories-wrapper'>
            
           <div className='cart-product-container'>
           
           <div className='cart-number-of-items'>
            
              <h1>Cart ({numberOfProductsInCart})</h1>
            </div>
            {
              cartProducts.map(cartItem=>{
                return(
                  <>
                  
            
                  <div className='cart-product-container'>
                  <div className='image-wrapper'>
              <img src={cartItem.image_url} alt='pic1' />
            </div>
            <div className='cartitem-title'>
              <p>
              {cartItem.title}
              </p>
            </div>
            <div className='cart-price-section'>
              <h1>KSh {(cartItem.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
              <div className='previous-price'>
              <p><i>KSh</i> {(cartItem.previousPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <span>-{cartItem.ratings}%</span>
              </div>
            </div>
            
            <div className='remove-cart-items'>
              <button onClick={()=>dispatch(removeFromCart(cartItem.p_id))}>
              <i className="fa-solid fa-trash-can"></i>
                Remove
              </button>
            </div>
            <div className='cart-add-btn'>
              <button className={cartItem.quantity===1&&'decrease-cart-disabled'} onClick={()=>dispatch(decreaseCart(cartItem))}>
              <i className={cartItem.quantity===1?'fa-solid fa-minus decrease-cart-disabled':'fa-solid fa-minus'}></i>
              </button>
              <span>{cartItem.quantity}</span>
              <button onClick={()=>dispatch(addToCart(cartItem))}>
              <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            </div>
           
                  </>
                )
              })
            }

           </div>
           <div className='cart-total-amount'>
            <h1>CART SUMMARY</h1>
            <div className='subtotal'>
              <h2>Subtotal</h2>
              <h1>KSh {cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            </div>
            <div className='express'>
            <p><i className="fa-regular fa-circle-check"></i>
              Jumomart Express items are eligible for free delivery </p>
            </div>
            <div className='check-out'>
            <NavLink to={'/checkout'}>
              <button>CHECKOUT (KSH {cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</button>
              </NavLink>
            </div>
           </div>
            </div>
            
            : 
            <section className='categories-wrapper'>
              <article className='products-cart'>
            <div className='cart-empty-state'>
            <img src='/images/cart.svg' alt='cart'/>
            <h1>Your cart is empty!</h1>
            <p>Browse our categories and discover our best deals!</p>
            <NavLink to={'/'} end >
            <button>
               Start Shopping
                </button></NavLink>
            </div>
          </article>
          </section>
          }
          
          </div>
          </>
  )
}

export default Cart