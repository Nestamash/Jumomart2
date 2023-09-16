import React from 'react'
import ImageSlider from './ImageSlider'
import './slideshow.scss'
const SlideShow = ({images}) => {
  return (
    <main>
        <div className='slideshow'>
          <aside className='aside-nav'>
            <div className='aside-links'>
             <i className="fa-solid fa-handshake-angle"></i>
              <p>Official Stores</p>
            </div>
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