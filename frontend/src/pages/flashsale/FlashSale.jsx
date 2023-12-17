import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firestore';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { NavLink } from 'react-router-dom';
import './flashsale.scss'
const FlashSale = ({handleID}) => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);

  const dispatch = useDispatch();
  //  Fetch random products from Firestore
  const fetchRandomProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, orderBy('title'), limit(10));
      const querySnapshot = await getDocs(q);
      const products = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        products.push({
          id: doc.id,
          ...productData,
        });
      });

      setFlashSaleProducts(products);
    } catch (error) {
      console.error('Error fetching random products:', error);
    }
  };

  useEffect(() => {
    // Fetch random products when the component mounts
    fetchRandomProducts();
  }, []); // Empty dependency array ensures this effect runs once



    // Flash sale timer
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const endDate = new Date('2023-12-25T23:59:59'); // Set your flash sale end date here
    const now = new Date();
    const difference = endDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  const formatTime = (value) => (value < 10 ? `0${value}` : value);


    const scrollLeft = ()=>{
    document.getElementById("slider1").scrollLeft -= 900;
  }
  const scrollRight = ()=>{
    document.getElementById("slider1").scrollLeft += 900;
  }


  function calculatePercentageDecrease(currentPrice, previousPrice) {
    if (currentPrice === 0 || previousPrice === 0) {
      return 0; // To avoid division by zero error
    }

    const decreaseAmount = previousPrice - currentPrice;
    const percentageDecrease = (decreaseAmount / previousPrice) * 100;

    return percentageDecrease;
  }


  console.log('flashsaleproducts: ', flashSaleProducts)

  return (
    <section className='lastviewed-container'>
        <div className='heading flash'>
            <h3><i className="fa-solid fa-bolt-lightning"></i>Flash Sales</h3>
            <p>
            Time Left: {timeLeft.days}d :{formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s
            </p>
            <a href='#'>SEE ALL
            <i className="fa-solid fa-chevron-right"></i>
            </a>
        </div>
        <div className='flashsale-container'>
        <button className='scroll-btn' onClick={scrollLeft} ><i className="fa-solid fa-chevron-left"></i></button>
        
        <div className='flashsale-product-wrapper' id='slider1'>
        
            {
                flashSaleProducts.map((view, i)=>{

                 const percentageDecrease = view ? calculatePercentageDecrease(view.price, view.previousPrice) : null;

                // Check if percentageDecrease is not null before using toFixed
                const formattedPercentageDecrease = percentageDecrease !== null ? -percentageDecrease.toFixed(0) : null;
 
      
                    return(
                      <article className="article" key={`${view.id}-${i}`}>
                      <div className="clikable" onClick={() => handleID(view)}>
                        <NavLink to={'/products-detail'}>
                          <figure>
                            <img src={view.image_url} alt="product-img" />
                          </figure>
                          <div className='title'>
                          <p>{view.title}</p>
                          </div>
                         <h1>Ksh. {view.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h1>
                          <div className="previous-price">
                            <h2>Ksh. {view.previousPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h2>
                            <span>
                              <strong>{formattedPercentageDecrease}</strong>
                            </span>
                          </div>
                          <div className='ratings-wrapper'>

                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-regular fa-star-half-stroke"></i>
                          <i>({view.ratings})</i>

                          </div>
                          
                        </NavLink>
                      </div>
                      <button
                        className={`cart-button}`}
                        onClick={() => dispatch(addToCart(view))}
                      >
                        ADD TO CART
                      </button>
                    </article>
                    )
                })
            }
            
        </div>
        <button className='scroll-btn' onClick={scrollRight} ><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    </section>
  )
}

export default FlashSale