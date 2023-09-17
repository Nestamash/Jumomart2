import './reset.css'
import NavBar from "./layouts/navbar/NavBar"
import Category from './pages/category/Category'
import SlideShow from './pages/slideshow/SlideShow'
import SlideshowMobile from './pages/slideshow/slideshowMobile'
import Lastviewed from './pages/lastviewed/Lastviewed'
import LastSearched from './pages/lastsearched/LastSearched'
import FlashSale from './pages/flashsale/FlashSale'
import Footer from './layouts/footer/Footer'

function App() {
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
     <SlideshowMobile images={images}/>
     <Lastviewed />
     <LastSearched />
     <FlashSale />
     {/* <Footer /> */}
     
    </>
  )
}

export default App
