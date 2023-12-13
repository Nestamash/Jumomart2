import React, {useState} from 'react'
import { useEffect } from 'react'
import { collection, query, where, orderBy, endAt, startAt, getDocs } from "firebase/firestore";
import { db } from '../../firestore';
import { NavLink } from 'react-router-dom';
import './navbar.scss'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/searchTermSlice';
import { setSearchResultsAction } from '../../redux/searchResultsSlice';
import { setSearchWord } from '../../redux/searchedWordSlice';

const NavBar = () => {
 
  const dispatch = useDispatch();
   const cartProducts = useSelector(state=>state.cart.cart)
   const numberOfProductsInCart = cartProducts.reduce((acc, curr)=>{
    return acc + curr.quantity;

  }, 0)
  const search_prediction = ['Laptop 1','Laptice','Lapmop','Lapnop','Laplap', 'Laptop 2', 'matiti', 'Laptop 4', 'Laptop 5', 'Laptop 6', 'Laptop 7', 'Laptop 8',]
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchPredictionVisible, setIsSearchPredictionVisible] = useState(false);
  // get search results from the firebase firestore
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length >= 3) {
        console.log('Search Query:', searchQuery);

        const startTerm = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase();
        const endTerm = startTerm.slice(0, -1) + String.fromCharCode(startTerm.charCodeAt(startTerm.length - 1) + 1);
  
        const q = query(
          collection(db, 'products'),
          orderBy('title'),
          startAt(startTerm),
          endAt(endTerm + '\uf8ff') // Ensure it goes up to the next character
        );

        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map((doc) => doc.data());

        console.log('Search Results:', results);

      setSearchResults(results); 

      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // console.log("FIRESTORE sEARCH RESULTS: ",searchResults)
  const handleItemClick = async (title) => {
    // Perform actions when an item is clicked
    setIsSearchPredictionVisible(false);
    console.log('Clicked item cool:', title);

 // Dispatch the action to set the search term in Redux
 dispatch(setSearchTerm(title));

  };

  function trimText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleButtonClick = () => {
     // pass the searchquery as prop to parent component
     setIsSearchPredictionVisible(false);
   // Check if searchResults is defined before dispatching
   dispatch(setSearchWord(searchQuery)); // Dispatch the action to update the searchedWord state
   
  if (searchResults !== undefined) {
    console.log("handle button acion dispacteds CHECKIT: ",searchResults)
    dispatch(setSearchResultsAction(searchResults)); // Dispatch the results to Redux
  }
  };
     
// STYLES TYPING MATCHED HELPER FUNCTION
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
      <NavLink to={'/'} >
      <img src='./logo.jpeg' alt='logo'/>
      </NavLink>
      <NavLink to={'/add-products'} >
      <i className="fa-solid fa-pen-to-square"></i>
      </NavLink>
        
      </div>
      <div className='account-and-cart-container'>
      <button>
      <i className="fa-regular fa-user"></i>
      <select name="cars" id="cars">
        <option disabled value="volvo">Account</option>
        <option value="saab">My Account</option> 
        <option value="opel">Orders</option>
        <option value="audi">Saved Items</option>
      </select>
      </button>
      
      <div className='cart-wrapper'>
        
        <span className='cart-no'>
          <p>{numberOfProductsInCart}</p>
        </span>
       
       
      <NavLink to={'/cart'} >
      <i className="fa-solid fa-cart-arrow-down"></i>
      </NavLink>
      </div>
      </div>
        <form className='search-bar-wrapper'>
          <input type='text' placeholder='Search products, brands, and categories'  
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsSearchFocused(true);
            setIsSearchPredictionVisible(true); // Set visibility to true when the input is focused
          }}
          onBlur={() => setIsSearchFocused(false)}
          />
           
                <NavLink to={'/search-q'} >
                <button type="button" onClick={handleButtonClick}>
                <i className="fa-solid fa-magnifying-glass"></i>
                </button> 
               
                </NavLink>
     
             
           
                <div className='search-prerdiction' 
                style={{ display: isSearchPredictionVisible ? 'block' : 'none' }}
                >
                  {searchResults.length > 0 && (
                    <ul>
                      {searchResults.slice(0, 5).map((pred, index) => ( // Displaying only the first 5 predictions
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
  )
}

export default NavBar