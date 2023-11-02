import React from 'react'
import NavBar from '../../layouts/navbar/NavBar'
import SlideShow from '../slideshow/SlideShow'
import Category from '../category/Category'
import FlashSale from '../flashsale/FlashSale'
import Footer from '../../layouts/footer/Footer'
const home = () => {
    const images = [
        {url:'./images/slideshow/Flashsale.gif'},
        {url:'./images/slideshow/fries.jpg'},
        {url:'./images/slideshow/shirtssale.jpg'},
        {url:'./images/slideshow/cockjameson.jpg'},
        {url:'./images/slideshow/Adidas.png'},
        {url:'./images/slideshow/BrandLovers.jpg'},
        {url:'./images/slideshow/SHome.jpg'}
        
    ]
  return (
    <>
    <NavBar />
    <SlideShow images={images}/>
    <Category />
    <FlashSale />
    <Footer />
    </>
  )
}

export default home