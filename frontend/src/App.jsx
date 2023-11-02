import { useState } from 'react'
import './reset.css'
import Home from './pages/home/home'
import NavBar from "./layouts/navbar/NavBar"
import Category from './pages/category/Category'
import SlideShow from './pages/slideshow/SlideShow'
import SlideshowMobile from './pages/slideshow/slideshowMobile'
import Lastviewed from './pages/lastviewed/Lastviewed'
import LastSearched from './pages/lastsearched/LastSearched'
import FlashSale from './pages/flashsale/FlashSale'
import Footer from './layouts/footer/Footer'
import ProductPreview from './pages/productPreview/ProductPreview'
import { Route, Routes } from 'react-router-dom'
import ProductDetail from './pages/productDetails/ProductDetail'
import Cart from './pages/cart/Cart'
import CheckOut from './components/Auth/CheckOut'
import PaymentPreview from './components/Auth/PaymentPreview'
import AddProducts from './pages/addproducts/AddProduct'
function App() {
  const [id, setID] = useState(null)
  const handleID = (data)=>{
    setID(data.id)
  }
  return (
    <>
    <Routes>
    <Route  path='/' element={<Home />}/>
    <Route  path='/last-searched' element={<LastSearched />}/>
    <Route  path='/last-viewed' element={<Lastviewed />}/>
    <Route  path='/last-searched' element={<LastSearched />}/>
    <Route  path='/products-preview' element={<ProductPreview handleID={handleID}/>}/>
    <Route  path='/products-detail' element={<ProductDetail productId={id}/>}/>
    <Route  path='/cart' element={<Cart />}/>
    <Route  path='/checkout' element={<CheckOut />}/>
    <Route  path='/payment-preview' element={<PaymentPreview />}/>
    <Route  path='/add-products' element={<AddProducts />}/>
    </Routes>
    </>
  )
}

export default App
