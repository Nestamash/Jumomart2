import React, { useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firestore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'; 
import './productdetail.scss'
import NavBar from '../../layouts/navbar/NavBar'
import Footer from '../../layouts/footer/Footer'

const ProductDetail = ({productId}) => {
  console.log('This is the HandleId: ', productId);
  const [product, setProduct] = useState([])
  const dispatch = useDispatch();
  const getProducts = async()=>{
    // let productId = 'FXG3SgSeCFuyiQvo21Jt'
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setProduct(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    
  }

  useEffect(()=>{
    getProducts()   
  },[])
  // console.log('not success:', product.title)
  function formatPrice(number) {
    if (number === undefined) {
      return ''; // or any default value you prefer
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
       <NavBar />
        <div className='container'>
          
         <section className='pcategories-wrapper'>
          <article className='product-photo-preview'>
           <img src={product.image_url} alt='phones' />
          </article>
          <article className='product-description'>
            <div className='official-store'>
                <span>Official Store</span>
                <i className="fa-regular fa-heart"></i>
            </div>
      
            <div className='desc'>
                <h1>{product.title}</h1>
                <p>Brand: {product.brand}</p>
            </div>
            <div className='product-price'>
            <span>KSh {formatPrice(product.price)}</span>
            <span>KSh {formatPrice(product.previousPrice)}</span>
            <span>{-
              Math.floor(
                (product.previousPrice-product.price)/product.previousPrice*100
              )
            
            }%</span>
            <p>In stock</p>
            <p>+ shipping from KSh 52 to CBD - UON/Globe/Koja/River Road</p>
            <p className='ratings'>
                <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
                </span>
                <a href='#'>({product.ratings} verified ratings)</a>
                </p>
            <button onClick={()=>dispatch(addToCart(product))}>
            <i className="fa-solid fa-cart-plus"></i>
                Add to cart</button>
            </div>
          </article>
          <article className='product-delivery-and-return'>
            <h3>DELIVERY & RETURNS</h3>
            <i className="fa-solid fa-truck"></i>
            <span>Door Delivery</span>
            <i className="fa-solid fa-rotate-left"></i>
            <span>Return Policy</span>
          </article>
          <article className='product-specification'>
          <h1>Product Description</h1>
          <div className='specs'>
            <p>{product.specification}</p>
            
          </div>
          </article>
         </section>
         
        </div>
        <Footer />
        </>
  )
}

export default ProductDetail