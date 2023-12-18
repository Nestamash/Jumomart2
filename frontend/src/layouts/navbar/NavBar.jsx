import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, endAt, startAt, getDocs } from "firebase/firestore";
import { db } from '../../firestore';
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/searchTermSlice';
import { setSearchResultsAction } from '../../redux/searchResultsSlice';
import { setSearchWord } from '../../redux/searchedWordSlice';
import { useAuth } from '../../components/AuthContext';
import { auth} from '../../firestore';

const NavBar = () => {
  const { user, logout } = useAuth();

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart);
  const numberOfProductsInCart = cartProducts.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const search_prediction = ['Laptop 1','Laptice','Lapmop','Lapnop','Laplap', 'Laptop 2', 'matiti', 'Laptop 4', 'Laptop 5', 'Laptop 6', 'Laptop 7', 'Laptop 8',];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchPredictionVisible, setIsSearchPredictionVisible] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length >= 3) {
        const startTerm = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase();
        const endTerm = startTerm.slice(0, -1) + String.fromCharCode(startTerm.charCodeAt(startTerm.length - 1) + 1);
  
        const q = query(
          collection(db, 'products'),
          orderBy('title'),
          startAt(startTerm),
          endAt(endTerm + '\uf8ff')
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => doc.data());

        setSearchResults(results); 
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleItemClick = async (title) => {
    setIsSearchPredictionVisible(false);
    dispatch(setSearchTerm(title));
  };

  function trimText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleButtonClick = () => {
    setIsSearchPredictionVisible(false);
    dispatch(setSearchWord(searchQuery));

    if (searchResults !== undefined) {
      dispatch(setSearchResultsAction(searchResults));
    }
  };

  const boldMatchedText = (text, query) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index !== -1) {
      const matchedText = text.slice(index, index + query.length);
      const restOfText = text.slice(index + query.length);
      return (
        <span>
          <strong>{matchedText}</strong>
          {restOfText}
        </span>
      );
    }
    return text;
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header>
      <div className='top-nav'>
        <h1>Jumomart upto 50% off</h1>
      </div>
      <div className='hambuger-menu flex'>
        <input type='checkbox' id='check' />
        <label htmlFor='check'>
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
        <NavLink to={'/'}>
          <img src='./logo.jpeg' alt='logo' />
        </NavLink>
        <NavLink to={'/add-products'}>
          <i className="fa-solid fa-pen-to-square"></i>
        </NavLink>
      </div>
      <div className='account-and-cart-container'>
        {user ? (
          <>
            <div className='user-email-logout'>
              <i className='fa-regular fa-user'></i> {user.email}
              <button onClick={handleLogout}>Logout</button>
            </div>
            
          </>
        ) : (
          <NavLink to={'/login-page'}>Login</NavLink>
        )}
        <div className='cart-wrapper'>
          <span className='cart-no'>
            <p>{numberOfProductsInCart}</p>
          </span>
          <NavLink to={'/cart'}>
            <i className="fa-solid fa-cart-arrow-down"></i>
          </NavLink>
        </div>
      </div>
      <form className='search-bar-wrapper'>
        <input
          type='text'
          placeholder='Search products, brands, and categories'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsSearchFocused(true);
            setIsSearchPredictionVisible(true);
          }}
          onBlur={() => setIsSearchFocused(false)}
        />
        <NavLink to={'/search-q'}>
          <button type="button" onClick={handleButtonClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </NavLink>
        <div className='search-prerdiction'
          style={{ display: isSearchPredictionVisible ? 'block' : 'none' }}>
          {searchResults.length > 0 && (
            <ul>
              {searchResults.slice(0, 5).map((pred, index) => (
                <NavLink to={'/search-q'} key={index}>
                  <li onClick={() => handleItemClick(pred)}>
                    {boldMatchedText(trimText(pred.title, 30), searchQuery)}
                  </li>
                </NavLink>
              ))}
            </ul>
          )}
        </div>
      </form>
    </header>
  );
};

export default NavBar;
