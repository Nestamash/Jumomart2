import { useState } from 'react'
import './reset.css'
import Home from './pages/home/Home'
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
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Searchedresults from './pages/searchedresults/searchedresults'
import AsideCategory from './pages/asideCategory/asideCategory'
import StripeSuccess from './pages/stripeSuccess/stripeSuccess'
function App() {
  const [id, setID] = useState(null)
  const handleID = (data)=>{
    console.log('SETID: ', data.id)
    setID(data.id)
  }
  const [childData, setChildData] = useState(null);

  const handleChildData = (dataFromChild) => {
    // Handle the data received from the child component
    console.log('Data from Home appjsx:', dataFromChild);
    setChildData(dataFromChild);
  };


  return (
    <>
    <Routes>
    <Route  path='/' element={<Home onDataFromHome={handleChildData} handleID={handleID}/>}/>
    <Route  path='/last-searched' element={<LastSearched />}/>
    <Route  path='/last-viewed' element={<Lastviewed />}/>
    <Route  path='/last-searched' element={<LastSearched />}/>
    <Route  path='/products-preview' element={<ProductPreview handleID={handleID} categoryClicked={childData}/>}/>
    <Route  path='/products-detail' element={<ProductDetail productId={id}/>}/>
    <Route  path='/cart' element={<Cart />}/>
    <Route  path='/checkout' element={<CheckOut />}/>
    <Route  path='/payment-preview' element={<PaymentPreview />}/>
    <Route  path='/add-products' element={<AddProducts />}/>
    <Route  path='/login-page' element={<Login />}/>
    <Route  path='/signup' element={<SignUp />}/>
    <Route  path='/search-q' element={<Searchedresults handleID={handleID} />}/>
    <Route  path='/aside-category' element={<AsideCategory handleID={handleID} />}/>
    <Route  path='/success' element={<StripeSuccess />}/>
    </Routes>
    </>
  )
}

export default App
