import React from 'react'
import './navbar.scss'
const NavBar = () => {
  return (
    <header>
      <div className='top-nav'>
        <h1>Jumomart upto 50% off</h1>
      </div>
      <div className='hambuger-menu flex'>
        <input type='checkbox' id='check' />
        <label for='check'>
          <div className='spans-wrapper flex'><span></span></div>
          </label>
         
          <ul>
            <h1>OUR SERVICES</h1>
          <a href="#"><li><i className="fa-solid fa-apple-whole"></i>Suppermarket</li></a>
          <a href="#"><li><i className="fa-solid fa-brush"></i>Health & Beauty</li></a>
          <a href="#"><li><i className="fa-solid fa-chair"></i>Home & Office</li></a>
          <a href="#"><li><i className="fa-solid fa-mobile-retro"></i>Phones & Tablets</li></a>
          <a href="#"><li><i className="fa-solid fa-desktop"></i>Computing</li></a>
          <a href="#"><li><i className="fa-solid fa-radio"></i>Electronics</li></a>
          <a href="#"><li><i className="fa-solid fa-shirt"></i>Fashion</li></a>
          <a href="#"><li><i className="fa-solid fa-gamepad"></i>Gaming</li></a>
          <a href="#"><li><i className="fa-solid fa-baby"></i>Baby Products</li></a>
          
        </ul>
          
      </div>
      <div className='logo'>
        <img src='./logo.jpeg' alt='logo'/>
      </div>
      <div className='account-and-cart-container'>
      <button>
      <i className="fa-regular fa-user"></i>
      <select name="cars" id="cars">
        <option selected disabled value="volvo">Account</option>
        <option value="saab">My Account</option> 
        <option value="opel">Orders</option>
        <option value="audi">Saved Items</option>
      </select>
      </button>
      
      <div className='cart-wrapper'>
      <a href='#'><i className="fa-solid fa-cart-arrow-down"></i></a>
      </div>
      </div>
        <form className='search-bar-wrapper'>
          <input type='text' placeholder='Search products, brands, and categories' />
          <button>
          <i className="fa-solid fa-magnifying-glass"></i>
          </button>  
        </form>
    </header>
  )
}

export default NavBar