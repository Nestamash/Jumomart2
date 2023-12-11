import React, {useState} from 'react'
import { useEffect } from 'react'
import { collection, query, where, orderBy, endAt, startAt, getDocs } from "firebase/firestore";
import { db } from '../../firestore';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '../../redux/searchTermSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import NavBar from '../../layouts/navbar/NavBar';
import './searchedresults.scss'
const Searchedresults = ({handleID}) => {
  const product = useSelector(selectSearchTerm);
   console.log('Global search term:', product);
   const productID = product.p_id;

   console.log('product id captured:', productID);

    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [titleID, setTitleID] = useState([]);
    const dispatch = useDispatch();
    
    const getProducts = async()=>{
    //    console.log('get it: ', categoryClicked)
      // let productCategory = search;
        const q = query(collection(db, "products"), where("p_id", "==", productID));
     let p = []
        const querySnapshot =  await getDocs(q)
      
          querySnapshot.docs.map((doc) => {
        
            const data = ({id:doc.id, ...doc.data()});
            p.push(data)
            setTitleID(p)
        })
    
      }

      useEffect(()=>{
          getProducts()   
      },[])

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
        };
      
        const decreaseAmount = previousPrice - currentPrice;
        const percentageDecrease = (decreaseAmount / previousPrice) * 100;
      
        return percentageDecrease;
      };

       const percentageDecrease = calculatePercentageDecrease(product.price, product.previousPrice);

  return (
    <>
    <NavBar />
    <div className = 'main-container'>
    <div className = 'search-container'>
        <div className='category-wrapper'>
            <p>product 1</p>
            <p>product 2</p>
            <p>product 3</p>
            <p>product 4</p>
            <p>product 5</p>
            <p>product 6</p>
            <p>product 7</p>
        </div>
        <div className='search-result-wrapper'>
            <div className='sort-by'>
                <p><strong>Sort by:</strong> Popularity 
                <i className="fa-solid fa-chevron-down"></i>
                </p>
            </div>
            <div className='product-found'>
            <p><strong>1</strong> products found</p>
            </div>
            <div className='search-results'>
              
{
  titleID.map(view=>{
    console.log('product id is now catured correct: ', view);
    return(
             
              
                        <article className='article'>
                            <div className='clikable' onClick={()=>{handleID(view)}}>
                            <NavLink to={'/products-detail'} >
                            <figure>
                                <img src={product.image_url} alt='product-img'/>
                            </figure>
                            <p className='truncate'>{product.title}</p>
                            <h1>Ksh. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                            <div className='previous-price'>
                            <h2>Ksh. {product.previousPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                            <span><strong>
                                {
                                    -percentageDecrease.toFixed(0)    
                                }
                            </strong></span>
                            </div>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star-half-stroke"></i>    
                            <i>({product.ratings})</i>
                            </NavLink> 
                            </div>
                            <button className={`cart-button ${isButtonVisible ? 'visible' : ''}`} onClick={()=> dispatch(addToCart(product))}>ADD TO CART</button>

                    </article> 
                    
    );
   })
}
                 
                    
                
            </div>
        </div>
    </div>
    </div>
    </>
   
  )
}

export default Searchedresults