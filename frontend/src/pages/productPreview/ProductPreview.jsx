import React, { useEffect } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firestore';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './productpreview.scss'
import NavBar from '../../layouts/navbar/NavBar';
const ProductPreview = ({handleID, categoryClicked}) => {
    const [product, setProduct] = useState([])

    const getProducts = async()=>{
       console.log('get it: ', categoryClicked)
      let productCategory = categoryClicked;
        const q = query(collection(db, "products"), where("category", "==", productCategory));
     let p = []
        const querySnapshot =  await getDocs(q)
      
          querySnapshot.docs.map((doc) => {
        
            const data = ({id:doc.id, ...doc.data()});
            p.push(data)
            setProduct(p)
        })
    
      }
      useEffect(()=>{
        getProducts()   
      },[])

      const scrollLeft = ()=>{
        document.getElementById("slider").scrollLeft -= 900;
      }
      const scrollRight = ()=>{
        document.getElementById("slider").scrollLeft += 900;
      }

  return (
    <>
    <NavBar />
    <section className='lastviewed-container'> 
        <div className='heading product-preview'>
            <h3>Top Picks For You</h3>
        </div>
        <div className='slider-container'>
        <button className='scroll-btn' onClick={scrollLeft} ><i className="fa-solid fa-chevron-left"></i></button>
        <div className='product-wrapper' id='slider'>
          
            {
                product.map(view=>{
                    return(
                        <NavLink to={'/products-detail'} >
                        <div className='card-wrapper' onClick={()=>handleID(view)}>
                <figure>
                    <img src={view.image_url} alt='/' />
                </figure>
                <div className='product-title'>
                    <p className='truncate'>{view.title}</p>
                    <h1>Ksh {(view.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                    <h2>Ksh {(view.previousPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                </div>
            </div>
            </NavLink>
                    )
                })
            }
            
        </div>
        <button className='scroll-btn' onClick={scrollRight} ><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    </section>
    </>
  )
}

export default ProductPreview