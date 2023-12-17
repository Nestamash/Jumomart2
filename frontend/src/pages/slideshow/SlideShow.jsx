import React, {useState, useEffect} from 'react'
import ImageSlider from './ImageSlider'
import './slideshow.scss'
import { NavLink } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
import { useDispatch } from 'react-redux';
import { setCategoryClicked } from '../../redux/categoryClickedSlice';

const SlideShow = ({images}) => {

  const categories = [
    { icon: 'fa-mobile-retro', label: 'Phones' },
    { icon: 'fa-tv', label: 'Television' },
    { icon: 'fa-blender-phone', label: 'Appliances' },
    { icon: 'fa-notes-medical', label: 'Health & Beauty' },
    { icon: 'fa-chair', label: 'Home & Office' },
    { icon: 'fa-shirt', label: 'Fashion' },
    { icon: 'fa-apple-whole', label: 'Supermarket' },
    { icon: 'fa-baby', label: 'Baby Products' },
    { icon: 'fa-computer', label: 'Computing' },
    { icon: 'fa-dumbbell', label: 'Sporting Goods' },
  ];

  const dispatch = useDispatch();

const handleClicked = (label) => {
  dispatch(setCategoryClicked(label));

  // Handle the click event
  console.log('Clicked on:', label);
};


  return (
    <main>
        <div className='slideshow'>
          <aside className='aside-nav'>

          {categories.map((category, index) => (
            <NavLink key={index} to='/aside-category'>
              <div className='aside-links' onClick={() => handleClicked(category.label)}>
                <i className={`fa-solid ${category.icon}`}></i>
                <p>{category.label}</p>
              </div>
            </NavLink>
          ))}

          </aside>
          <article className='main-slide-show'>
            {/* <img src='./images/_SBundle.jpg' alt='/' /> */}
            <ImageSlider images={images}/>
          </article>
          <article className='help-center'>
            <div className='help'>
              <img src='./images/question.png' alt='#' />
              <div>
              <h1>help center</h1>
              <p>guide to customer care</p>
              </div>
            </div>
            <div className='help'>
              <img src='./images/payment-return.png' alt='#' />
              <div>
              <h1>Easy Return</h1>
              <p>quick refund</p>
              </div>
            </div>
            <div className='help'>
              <img src='./images/sell.png' alt='#' />
              <div>
              <h1>sell on jumomart</h1>
              <p>milions of visitors</p>
              </div>
            </div>
          </article>
          <article className='live-now-gif'>
          <img src='./images/slideshowgif.gif' alt='/' />
          </article>
        </div>
    </main>
  )
}

export default SlideShow