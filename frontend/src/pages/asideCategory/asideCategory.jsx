import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '../../redux/searchTermSlice';
import { selectSearchResults } from '../../redux/searchResultsSlice';
import { selectSearchedWord } from '../../redux/searchedWordSlice';
import { selectCategoryClicked } from '../../redux/categoryClickedSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import NavBar from '../../layouts/navbar/NavBar';
import './asideCategory.scss';

const AsideCategory = ({handleID}) => {
  const categoryClicked = useSelector(selectCategoryClicked);

  const [titleID, setTitleID] = useState([]);
  const dispatch = useDispatch();

  const getProducts = async (category) => {
    // console.log('Fetching product for category:', category);
    if (category) {
      const q = query(collection(db, 'products'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
  
      let products = [];
      querySnapshot.docs.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        products.push(data);
      });
  
      // Set the state after fetching all products for the current productID
      setTitleID((prevTitleID) => [...prevTitleID, ...products]);

      
    }
  };

  useEffect(() => {
     // Clear titleID before starting a new search
     setTitleID([]);

    // Only call getProducts if categoryClicked is valid
  if (categoryClicked) {
    getProducts(categoryClicked);
  }
  }, [categoryClicked]);


  console.log('this is the title context::: ', titleID)

  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="search-container">
          <div className="search-result-wrapper">
            <div className="sort-by">
              <p>
                <strong>Sort by:</strong> Popularity
                <i className="fa-solid fa-chevron-down"></i>
              </p>
            </div>
            <div className="product-found">
              <p>
                Top Deals on 
                <strong>{categoryClicked}</strong>
              </p>
            </div>
            

            <div className="search-results">
  {titleID.length > 0 ? (
    titleID.map((view, index) => {
      const isUnique = titleID.findIndex((item) => item.id === view.id) === index;

      if (!isUnique) {
        return null; // Skip rendering duplicates
      }

      return (
        <article className="article" key={`${view.id}-${index}`}>
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
                  <strong>{-view.ratings}</strong>
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
            className={`cart-button}`}
            onClick={() => dispatch(addToCart(view))}
          >
            ADD TO CART
          </button>
        </article>
      );
    })
  ) : (
    // Render the empty state JSX when titleID is empty
    <div className="empty-state">
      <img src="./images/binoculars.svg" alt="Empty State Image" />
      <h1>There are no results found</h1>
      <NavLink to={'/'}>
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

export default AsideCategory;
