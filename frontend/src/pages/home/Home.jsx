import React, { useState } from 'react'
import NavBar from '../../layouts/navbar/NavBar'
import SlideShow from '../slideshow/SlideShow'
import Category from '../category/Category'
import FlashSale from '../flashsale/FlashSale'
import Footer from '../../layouts/footer/Footer'
const home = ({onDataFromHome}) => {
  const [childData, setChildData] = useState(null);
  
  const handleChildData = (dataFromChild) => {
    // Handle the data received from the child component
    console.log('Data from child:', dataFromChild);
    setChildData(dataFromChild);
    onDataFromHome(dataFromChild)
  };
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
    <Category onDataFromChild={handleChildData}/>
    <FlashSale />
    <Footer />
    </>
  )
}

export default home