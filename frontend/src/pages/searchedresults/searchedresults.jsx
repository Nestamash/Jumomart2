import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '../../redux/searchTermSlice';
import { selectSearchResults } from '../../redux/searchResultsSlice';
import { selectSearchedWord } from '../../redux/searchedWordSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import NavBar from '../../layouts/navbar/NavBar';
import './searchedresults.scss';

const Searchedresults = ({ handleID }) => {
  const product = useSelector(selectSearchTerm);
  const typedWord = useSelector(selectSearchedWord);
  console.log('Global search term:', product);

  // Check if product is not null before accessing p_id
  const productID = product ? product.p_id : null;
  console.log('product id captured:', productID);

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [titleID, setTitleID] = useState([]);
  const [searchedWord, setsearchedWord] = useState('');
  const dispatch = useDispatch();

  const getProducts = async () => {
    if (productID) {
      const q = query(collection(db, 'products'), where('p_id', '==', productID));
      let p = [];
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        p.push(data);
        setTitleID(p);
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [productID]);

  useEffect(() => {
    // Set a timeout to delay the animation, you can adjust the duration as needed
    const timeoutId = setTimeout(() => {
      setIsButtonVisible(true);
    }, 500); // 500 milliseconds delay, adjust as needed

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  function calculatePercentageDecrease(currentPrice, previousPrice) {
    if (currentPrice === 0 || previousPrice === 0) {
      return 0; // To avoid division by zero error
    }

    const decreaseAmount = previousPrice - currentPrice;
    const percentageDecrease = (decreaseAmount / previousPrice) * 100;

    return percentageDecrease;
  }

  const percentageDecrease = product ? calculatePercentageDecrease(product.price, product.previousPrice) : null;
 
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="search-container">
          <div className="category-wrapper">
            <p>product 1</p>
            <p>product 2</p>
            <p>product 3</p>
            <p>product 4</p>
            <p>product 5</p>
            <p>product 6</p>
            <p>product 7</p>
          </div>
          <div className="search-result-wrapper">
            <div className="sort-by">
              <p>
                <strong>Sort by:</strong> Popularity
                <i className="fa-solid fa-chevron-down"></i>
              </p>
            </div>
            <div className="product-found">
              <p>
                <strong>{titleID.length}</strong> products found
              </p>
            </div>
            <div className="search-results">
              {titleID.length > 0 ? (
                titleID.map((view) => (
                  <article className="article" key={view.id}>
                    <div className="clikable" onClick={() => handleID(view)}>
                      <NavLink to={'/products-detail'}>
                        <figure>
                          <img src={view.image_url} alt="product-img" />
                        </figure>
                        <p className="truncate">{view.title}</p>
                        <h1>Ksh. {view.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h1>
                        <div className="previous-price">
                          <h2>Ksh. {view.previousPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h2>
                          <span>
                            <strong>{-percentageDecrease.toFixed(0)}</strong>
                          </span>
                        </div>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                        <i>({view.ratings})</i>
                      </NavLink>
                    </div>
                    <button
                      className={`cart-button ${isButtonVisible ? 'visible' : ''}`}
                      onClick={() => dispatch(addToCart(view))}
                    >
                      ADD TO CART
                    </button>
                  </article>
                ))
              ) : (
                // Render the empty state JSX when titleID is empty
            
                <div className="empty-state">
                  <img src="./images/binoculars.svg" alt="Empty State Image" />
                  <h1>There are no results for {typedWord}.</h1>
                  <p>- Check your spelling for typing errors</p>
                  <p>- Try searching with short and simple keywords</p>
                  <p>- Try searching more general terms - you can then filter the search results</p>
                  <NavLink to={'/'} >
                  <span>GO TO HOMEPAGE</span>
                  </NavLink>
                  
                </div>

              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchedresults;
